import { Product } from './product.entity';

export class Category {
  constructor(
    public name: string,
    public menuId: string,
    public createdAt: Date,
    public updatedAt: Date,
    public productIds: string[] = [],
    public id?: string,
    public products?: Product[],
  ) {}
}
