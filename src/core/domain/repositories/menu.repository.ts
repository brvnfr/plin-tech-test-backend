import { Menu } from '../entities/menu.entity';

export const IMenuRepositoryToken = 'IMenuRepository';

export interface IMenuRepository {
  create(menu: Menu): Promise<Menu>;
  findById(id: string): Promise<Menu | null>;
  findDailyMenus(): Promise<Menu[]>;
  update(id: string, menu: Partial<Menu>): Promise<Menu>;
  delete(id: string): Promise<void>;
}
