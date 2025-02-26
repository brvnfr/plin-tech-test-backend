/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@/core/domain/repositories/user.repository';
import { User } from '@/core/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(user: User): Promise<User> {
    try {
      user.password = await bcrypt.hash(user.password, 10);

      return await this.userRepository.create(user);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create user: ${message}`);
    }
  }
}
