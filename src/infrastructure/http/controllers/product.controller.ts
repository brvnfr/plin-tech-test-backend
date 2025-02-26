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
} from '@nestjs/common';
import { ProductService } from '@/core/domain/services/product.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { Product } from '@/core/domain/entities/product.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Product')
@ApiBearerAuth('JWT')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() productDto: CreateProductDto): Promise<Product> {
    try {
      return await this.productService.createProduct(productDto as Product);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create product: ${message}`);
    }
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<Product | null> {
    try {
      return await this.productService.getProductById(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Product not found: ${message}`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() productDto: UpdateProductDto,
  ): Promise<Product> {
    try {
      return await this.productService.updateProduct(
        id,
        productDto as Partial<Product>,
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update product: ${message}`);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.productService.deleteProduct(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Failed to delete product: ${message}`);
    }
  }
}
