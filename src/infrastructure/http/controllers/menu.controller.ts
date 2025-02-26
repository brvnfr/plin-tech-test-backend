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
import { MenuService } from '@/core/domain/services/menu.service';
import { CreateMenuDto, UpdateMenuDto } from '../dtos/menu.dto';
import { Menu } from '@/core/domain/entities/menu.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CacheInterceptor } from '@nestjs/cache-manager';

@ApiTags('Menu')
@ApiBearerAuth('JWT')
@Controller('menus')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Post()
  async create(@Body() menuDto: CreateMenuDto): Promise<Menu> {
    try {
      return await this.menuService.createMenu(
        new Menu(
          '',
          menuDto.shift,
          new Date(),
          new Date(),
          menuDto.categoryIds ?? [],
        ),
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create menu: ${message}`);
    }
  }

  @Get('daily')
  @UseInterceptors(CacheInterceptor)
  async getDailyMenus(): Promise<Menu[]> {
    try {
      const menus = await this.menuService.getDailyMenus();
      return menus;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Daily menus not found: ${message}`);
    }
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<Menu | null> {
    try {
      return await this.menuService.getMenuById(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Menu not found: ${message}`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() menuDto: UpdateMenuDto,
  ): Promise<Menu> {
    try {
      return await this.menuService.updateMenu(id, menuDto as Partial<Menu>);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update menu: ${message}`);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.menuService.deleteMenu(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Failed to delete menu: ${message}`);
    }
  }
}
