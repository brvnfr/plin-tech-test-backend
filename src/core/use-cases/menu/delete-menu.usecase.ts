import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import {
  IMenuRepository,
  IMenuRepositoryToken,
} from '@/core/domain/repositories/menu.repository';

@Injectable()
export class DeleteMenuUseCase {
  constructor(
    @Inject(IMenuRepositoryToken)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      const existingMenu = await this.menuRepository.findById(id);
      if (!existingMenu) {
        throw new NotFoundException(`Menu with ID ${id} not found`);
      }
      await this.menuRepository.delete(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to delete menu: ${message}`);
    }
  }
}
