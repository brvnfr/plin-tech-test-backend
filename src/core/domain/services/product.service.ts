import { Injectable } from '@nestjs/common';
import { Product } from '@/core/domain/entities/product.entity';
import { CreateProductUseCase } from '@/core/use-cases/product/create-product.usecase';
import { GetProductUseCase } from '@/core/use-cases/product/get-product.usecase';
import { UpdateProductUseCase } from '@/core/use-cases/product/update-product.usecase';
import { DeleteProductUseCase } from '@/core/use-cases/product/delete-product.usecase';

@Injectable()
export class ProductService {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getProductUseCase: GetProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  async createProduct(product: Product): Promise<Product> {
    return this.createProductUseCase.execute(product);
  }

  async getProductById(id: string): Promise<Product | null> {
    return this.getProductUseCase.execute(id);
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<Product> {
    return this.updateProductUseCase.execute(id, product);
  }

  async deleteProduct(id: string): Promise<void> {
    return this.deleteProductUseCase.execute(id);
  }
}
