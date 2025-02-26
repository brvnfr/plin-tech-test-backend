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
import { Menu } from '@/core/domain/entities/menu.entity';

@Injectable()
export class UpdateMenuUseCase {
  constructor(
    @Inject(IMenuRepositoryToken)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute(id: string, menu: Partial<Menu>): Promise<Menu> {
    try {
      const existingMenu = await this.menuRepository.findById(id);
      if (!existingMenu) {
        throw new NotFoundException(`Menu with ID ${id} not found`);
      }
      return await this.menuRepository.update(id, menu);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update menu: ${message}`);
    }
  }
}
