import { Injectable } from '@nestjs/common';
import { Menu } from '@/core/domain/entities/menu.entity';
import { CreateMenuUseCase } from '@/core/use-cases/menu/create-menu.usecase';
import { GetMenuByIdUseCase } from '@/core/use-cases/menu/get-menu.usecase';
import { GetDailyMenusUseCase } from '@/core/use-cases/menu/get-daily-menu.usecase';
import { UpdateMenuUseCase } from '@/core/use-cases/menu/update-menu.usecase';
import { DeleteMenuUseCase } from '@/core/use-cases/menu/delete-menu.usecase';

@Injectable()
export class MenuService {
  constructor(
    private readonly createMenuUseCase: CreateMenuUseCase,
    private readonly getMenuByIdUseCase: GetMenuByIdUseCase,
    private readonly getDailyMenusUseCase: GetDailyMenusUseCase,
    private readonly updateMenuUseCase: UpdateMenuUseCase,
    private readonly deleteMenuUseCase: DeleteMenuUseCase,
  ) {}

  async createMenu(menu: Menu): Promise<Menu> {
    return this.createMenuUseCase.execute(menu);
  }

  async getMenuById(id: string): Promise<Menu | null> {
    return this.getMenuByIdUseCase.execute(id);
  }

  async getDailyMenus(): Promise<Menu[]> {
    const menus = await this.getDailyMenusUseCase.execute();
    return menus;
  }

  async updateMenu(id: string, menu: Partial<Menu>): Promise<Menu> {
    return this.updateMenuUseCase.execute(id, menu);
  }

  async deleteMenu(id: string): Promise<void> {
    return this.deleteMenuUseCase.execute(id);
  }
}
