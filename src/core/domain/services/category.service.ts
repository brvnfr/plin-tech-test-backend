import { Injectable } from '@nestjs/common';
import { Category } from '@/core/domain/entities/category.entity';
import { CreateCategoryUseCase } from '@/core/use-cases/category/create-category.usecase';
import { GetCategoryByIdUseCase } from '@/core/use-cases/category/get-category.usecase';
import { UpdateCategoryUseCase } from '@/core/use-cases/category/update-category.usecase';
import { DeleteCategoryUseCase } from '@/core/use-cases/category/delete-category.usecase';
import { GetCategoryWithProductsUseCase } from '@/core/use-cases/category/get-category-with-products';

@Injectable()
export class CategoryService {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getCategoryByIdUseCase: GetCategoryByIdUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getCategoryWithProductsUseCase: GetCategoryWithProductsUseCase,
  ) {}

  async createCategory(category: Category): Promise<Category> {
    return this.createCategoryUseCase.execute(category);
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return this.getCategoryByIdUseCase.execute(id);
  }

  async updateCategory(
    id: string,
    category: Partial<Category>,
  ): Promise<Category> {
    return this.updateCategoryUseCase.execute(id, category);
  }

  async deleteCategory(id: string): Promise<void> {
    return this.deleteCategoryUseCase.execute(id);
  }

  async getCategoryWithProducts(id: string): Promise<Category | null> {
    return this.getCategoryWithProductsUseCase.execute(id);
  }
}
