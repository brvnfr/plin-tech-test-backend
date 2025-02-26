import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product } from '../../../core/domain/entities/product.entity';
import { IProductRepository } from '@/core/domain/repositories/product.repository';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(product: Product): Promise<Product> {
    return this.prisma.product.create({
      data: product,
    });
  }

  async findById(id: string): Promise<Product | null> {
    return this.prisma.product.findUnique({ where: { id } });
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    return this.prisma.product.update({ where: { id }, data: product });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }
}
