import { Injectable } from '@nestjs/common';
import { Menu } from '@/core/domain/entities/menu.entity';
import { CreateMenuUseCase } from '@/core/use-cases/menu/create-menu.usecase';
import { GetMenuByIdUseCase } from '@/core/use-cases/menu/get-menu.usecase';
import { GetDailyMenuUseCase } from '@/core/use-cases/menu/get-daily-menu.usecase';
import { UpdateMenuUseCase } from '@/core/use-cases/menu/update-menu.usecase';
import { DeleteMenuUseCase } from '@/core/use-cases/menu/delete-menu.usecase';

@Injectable()
export class MenuService {
  constructor(
    private readonly createMenuUseCase: CreateMenuUseCase,
    private readonly getMenuByIdUseCase: GetMenuByIdUseCase,
    private readonly getDailyMenuUseCase: GetDailyMenuUseCase,
    private readonly updateMenuUseCase: UpdateMenuUseCase,
    private readonly deleteMenuUseCase: DeleteMenuUseCase,
  ) {}

  async createMenu(menu: Menu): Promise<Menu> {
    return this.createMenuUseCase.execute(menu);
  }

  async getMenuById(id: string): Promise<Menu | null> {
    return this.getMenuByIdUseCase.execute(id);
  }

  async getDailyMenu(): Promise<Menu | null> {
    return this.getDailyMenuUseCase.execute();
  }

  async updateMenu(id: string, menu: Partial<Menu>): Promise<Menu> {
    return this.updateMenuUseCase.execute(id, menu);
  }

  async deleteMenu(id: string): Promise<void> {
    return this.deleteMenuUseCase.execute(id);
  }
}
