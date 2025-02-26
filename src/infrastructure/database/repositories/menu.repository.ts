import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Menu } from '@/core/domain/entities/menu.entity';
import { IMenuRepository } from '@/core/domain/repositories/menu.repository';

@Injectable()
export class MenuRepository implements IMenuRepository {
  private prisma = new PrismaClient();

  async findDailyMenu(): Promise<Menu | null> {
    const currentHour = new Date().getHours();
    const shift = currentHour >= 6 && currentHour < 18 ? 'day' : 'night';

    const menu = await this.prisma.menu.findFirst({
      where: { shift },
      include: { categories: true },
    });

    if (!menu) return null;

    return new Menu(
      menu.id,
      menu.shift as 'day' | 'night',
      menu.createdAt,
      menu.updatedAt,
      menu.categoryIds,
      menu.categories,
    );
  }

  async create(menu: Menu): Promise<Menu> {
    const createdMenu = await this.prisma.menu.create({
      data: {
        id: menu.id,
        shift: menu.shift,
        categoryIds: menu.categoryIds ?? [],
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
      },
    });

    return new Menu(
      createdMenu.id,
      createdMenu.shift === 'day' ? 'day' : 'night',
      createdMenu.createdAt,
      createdMenu.updatedAt,
      createdMenu.categoryIds,
      [],
    );
  }

  async findById(id: string): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: { categories: true },
    });

    if (!menu) return null;

    return new Menu(
      menu.id,
      menu.shift === 'day' ? 'day' : 'night',
      menu.createdAt,
      menu.updatedAt,
      menu.categoryIds,
      menu.categories,
    );
  }

  async findWithProducts(id: string): Promise<Menu | null> {
    const menu = await this.prisma.menu.findUnique({
      where: { id },
      include: {
        categories: {
          include: { products: true },
        },
      },
    });

    if (!menu) return null;

    return new Menu(
      menu.id,
      menu.shift === 'day' ? 'day' : 'night',
      menu.createdAt,
      menu.updatedAt,
      menu.categoryIds,
      menu.categories,
    );
  }

  async update(id: string, menu: Partial<Menu>): Promise<Menu> {
    const updatedMenu = await this.prisma.menu.update({
      where: { id },
      data: {
        shift: menu.shift ?? 'day',
        categoryIds: menu.categoryIds ?? [],
        updatedAt: new Date(),
      },
    });

    return new Menu(
      updatedMenu.id,
      updatedMenu.shift === 'day' ? 'day' : 'night',
      updatedMenu.createdAt,
      updatedMenu.updatedAt,
      updatedMenu.categoryIds,
      [],
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.menu.delete({ where: { id } });
  }
}
