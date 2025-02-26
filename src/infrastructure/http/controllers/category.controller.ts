import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  Body,
  BadRequestException,
  NotFoundException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CategoryService } from '@/core/domain/services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { Category } from '@/core/domain/entities/category.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { JwtAuthGuard } from '@/infrastructure/auth/jwt-auth.guard';
@ApiTags('Category')
@ApiBearerAuth('JWT')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() categoryDto: CreateCategoryDto): Promise<Category> {
    try {
      return await this.categoryService.createCategory(
        new Category(
          categoryDto.name,
          categoryDto.menuId,
          new Date(),
          new Date(),
          categoryDto.productIds ?? [],
        ),
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create category: ${message}`);
    }
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<Category | null> {
    try {
      return await this.categoryService.getCategoryById(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Category not found: ${message}`);
    }
  }

  @Get(':id/products')
  @UseInterceptors(CacheInterceptor)
  async getWithProducts(@Param('id') id: string): Promise<Category | null> {
    try {
      return await this.categoryService.getCategoryWithProducts(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(
        `Category with products not found: ${message}`,
      );
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() categoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    try {
      return await this.categoryService.updateCategory(
        id,
        categoryDto as Partial<Category>,
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update category: ${message}`);
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.categoryService.deleteCategory(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Failed to delete category: ${message}`);
    }
  }
}
