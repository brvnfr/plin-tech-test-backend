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
export class GetDailyMenuUseCase {
  constructor(
    @Inject(IMenuRepositoryToken)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute(): Promise<Menu> {
    try {
      const menu = await this.menuRepository.findDailyMenu();
      if (!menu) {
        throw new NotFoundException(`Daily menu not found`);
      }
      return menu;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to get daily menu: ${message}`);
    }
  }
}
