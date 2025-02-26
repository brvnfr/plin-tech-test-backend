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
export class GetMenuByIdUseCase {
  constructor(
    @Inject(IMenuRepositoryToken)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute(id: string): Promise<Menu> {
    try {
      const menu = await this.menuRepository.findById(id);
      if (!menu) {
        throw new NotFoundException(`Menu with ID ${id} not found`);
      }
      return menu;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to get menu: ${message}`);
    }
  }
}
