import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  ICategoryRepository,
  ICategoryRepositoryToken,
} from '@/core/domain/repositories/category.repository';
import { Category } from '@/core/domain/entities/category.entity';

@Injectable()
export class CreateCategoryUseCase {
  constructor(
    @Inject(ICategoryRepositoryToken)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(category: Category): Promise<Category> {
    try {
      return await this.categoryRepository.create(category);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create category: ${message}`);
    }
  }
}
