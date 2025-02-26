import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Category } from '@/core/domain/entities/category.entity';
import { ICategoryRepository } from '@/core/domain/repositories/category.repository';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  private prisma = new PrismaClient();

  async create(category: Category): Promise<Category> {
    return await this.prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        menuId: category.menuId,
        productIds: category.productIds ?? [],
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
      },
    });
  }

  async findById(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async update(id: string, category: Partial<Category>): Promise<Category> {
    return await this.prisma.category.update({
      where: { id },
      data: {
        name: category.name,
        menuId: category.menuId ?? undefined,
        productIds: category.productIds ?? [],
        updatedAt: new Date(),
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  async findWithProducts(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });
  }
}
