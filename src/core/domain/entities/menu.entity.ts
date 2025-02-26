import { Category } from './category.entity';

export class Menu {
  constructor(
    public id: string,
    public shift: 'day' | 'night',
    public createdAt: Date,
    public updatedAt: Date,
    public categoryIds: string[] = [],
    public categories?: Category[],
  ) {}
}
