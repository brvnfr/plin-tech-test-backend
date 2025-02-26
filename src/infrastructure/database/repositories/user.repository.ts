import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { User } from '@/core/domain/entities/user.entity';
import { IUserRepository } from '@/core/domain/repositories/user.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  private prisma = new PrismaClient();

  async create(user: User): Promise<User> {
    const createdUser = await this.prisma.user.create({
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    return new User(
      createdUser.username,
      createdUser.email,
      createdUser.password,
      createdUser.createdAt,
      createdUser.updatedAt,
      createdUser.id,
    );
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return user
      ? new User(
          user.username,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
          user.id,
        )
      : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user
      ? new User(
          user.username,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
          user.id,
        )
      : null;
  }

  async findByUsername(username: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { username } });
    return user
      ? new User(
          user.username,
          user.email,
          user.password,
          user.createdAt,
          user.updatedAt,
          user.id,
        )
      : null;
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        username: user.username,
        email: user.email,
        password: user.password,
        updatedAt: new Date(),
      },
    });

    return new User(
      updatedUser.username,
      updatedUser.email,
      updatedUser.password,
      updatedUser.createdAt,
      updatedUser.updatedAt,
      updatedUser.id,
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
