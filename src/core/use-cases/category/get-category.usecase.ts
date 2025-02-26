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
export class GetCategoryByIdUseCase {
  constructor(
    @Inject(ICategoryRepositoryToken)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    try {
      const category = await this.categoryRepository.findById(id);
      if (!category) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      return category;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to get category: ${message}`);
    }
  }
}
