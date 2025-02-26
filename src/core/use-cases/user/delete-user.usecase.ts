import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@/core/domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Failed to delete user: ${message}`);
    }
  }
}
