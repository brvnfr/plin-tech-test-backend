import { User } from '../entities/user.entity';

export const IUserRepositoryToken = Symbol('IUserRepository');

export interface IUserRepository {
  create(user: User): Promise<User>;
  findById(id: string): Promise<User | null>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
}
