import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@/core/domain/repositories/user.repository';
import { User } from '@/core/domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, user: Partial<User>): Promise<User> {
    try {
      return await this.userRepository.update(id, user);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update user: ${message}`);
    }
  }
}
