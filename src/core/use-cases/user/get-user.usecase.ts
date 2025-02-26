import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@/core/domain/repositories/user.repository';
import { User } from '@/core/domain/entities/user.entity';

@Injectable()
export class GetUserByIdUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) throw new NotFoundException(`User not found with ID: ${id}`);
      return user;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Failed to get user: ${message}`);
    }
  }
}
