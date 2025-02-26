import { Product } from '../entities/product.entity';

export const IProductRepositoryToken = Symbol('IProductRepository');

export interface IProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | null>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  delete(id: string): Promise<void>;
}
