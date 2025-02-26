import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  ICategoryRepository,
  ICategoryRepositoryToken,
} from '@/core/domain/repositories/category.repository';
import { Category } from '@/core/domain/entities/category.entity';

@Injectable()
export class UpdateCategoryUseCase {
  constructor(
    @Inject(ICategoryRepositoryToken)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string, category: Partial<Category>): Promise<Category> {
    try {
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return await this.categoryRepository.update(id, category);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update category: ${message}`);
    }
  }
}
