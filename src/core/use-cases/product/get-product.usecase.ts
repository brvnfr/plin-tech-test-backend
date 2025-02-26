import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Product } from '@/core/domain/entities/product.entity';
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@/core/domain/repositories/product.repository';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    if (!product) {
      throw new NotFoundException(`Produto com ${id} não encontrado`);
    }
    return product;
  }
}
