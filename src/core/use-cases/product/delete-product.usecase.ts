import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  IProductRepository,
  IProductRepositoryToken,
} from '@/core/domain/repositories/product.repository';

@Injectable()
export class DeleteProductUseCase {
  constructor(
    @Inject(IProductRepositoryToken)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const existingProduct = await this.productRepository.findById(id);
      if (!existingProduct) {
        throw new NotFoundException(`Produto com ID ${id} não encontrado`);
      }
      await this.productRepository.delete(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Falha ao deletar produto: ${message}`);
    }
  }
}
