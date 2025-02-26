import { Injectable, Inject } from '@nestjs/common';
import {
  IMenuRepository,
  IMenuRepositoryToken,
} from '@/core/domain/repositories/menu.repository';
import { Menu } from '@/core/domain/entities/menu.entity';

@Injectable()
export class GetDailyMenusUseCase {
  constructor(
    @Inject(IMenuRepositoryToken)
    private readonly menuRepository: IMenuRepository,
  ) {}

  async execute(): Promise<Menu[]> {
    return this.menuRepository.findDailyMenus();
  }
}
