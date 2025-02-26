import { Category } from '../entities/category.entity';

export const ICategoryRepositoryToken = 'ICategoryRepository';

export interface ICategoryRepository {
  create(category: Category): Promise<Category>;
  findById(id: string): Promise<Category | null>;
  update(id: string, category: Partial<Category>): Promise<Category>;
  delete(id: string): Promise<void>;
  findWithProducts(id: string): Promise<Category | null>;
}
