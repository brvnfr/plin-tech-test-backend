import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Product } from '@/core/domain/entities/product.entity';
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@/core/domain/repositories/product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(product: Product): Promise<Product> {
    try {
      return await this.productRepository.create(product);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create product: ${message}`);
    }
  }
}
