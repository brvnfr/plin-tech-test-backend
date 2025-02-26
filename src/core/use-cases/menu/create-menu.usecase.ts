import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  IMenuRepository,
  IMenuRepositoryToken,
} from '@/core/domain/repositories/menu.repository';
import { Menu } from '@/core/domain/entities/menu.entity';

@Injectable()
export class CreateMenuUseCase {
  constructor(
    @Inject(IMenuRepositoryToken)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute(menu: Menu): Promise<Menu> {
    try {
      return await this.menuRepository.create(menu);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create menu: ${message}`);
    }
  }
}
