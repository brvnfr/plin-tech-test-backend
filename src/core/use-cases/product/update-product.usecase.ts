import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Product } from '@/core/domain/entities/product.entity';
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@/core/domain/repositories/product.repository';

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string, product: Partial<Product>): Promise<Product> {
    try {
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        throw new NotFoundException(`Produto com o ID ${id} não encontrado`);
      }
      return await this.productRepository.update(id, product);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update product: ${message}`);
    }
  }
}
