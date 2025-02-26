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

@Injectable()
export class DeleteCategoryUseCase {
  constructor(
    @Inject(ICategoryRepositoryToken)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const existingCategory = await this.categoryRepository.findById(id);
      if (!existingCategory) {
        throw new NotFoundException(`Category with ID ${id} not found`);
      }
      await this.categoryRepository.delete(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to delete category: ${message}`);
    }
  }
}
