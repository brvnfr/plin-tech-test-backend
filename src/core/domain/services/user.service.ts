import { Injectable } from '@nestjs/common';
import { User } from '@/core/domain/entities/user.entity';
import { CreateUserUseCase } from '@/core/use-cases/user/create-user.usecase';
import { GetUserByIdUseCase } from '@/core/use-cases/user/get-user.usecase';
import { UpdateUserUseCase } from '@/core/use-cases/user/update-user.usecase';
import { DeleteUserUseCase } from '@/core/use-cases/user/delete-user.usecase';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
    private readonly userRepository: UserRepository,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.createUserUseCase.execute(user);
  }

  async getUserById(id: string): Promise<User | null> {
    return await this.getUserByIdUseCase.execute(id);
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return await this.updateUserUseCase.execute(id, user);
  }

  async deleteUser(id: string): Promise<void> {
    await this.deleteUserUseCase.execute(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findByEmail(email);
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }
}
