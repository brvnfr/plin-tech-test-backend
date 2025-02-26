import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '@/core/domain/services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { User } from '@/core/domain/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userDto: CreateUserDto): Promise<User> {
    try {
      return await this.userService.createUser(
        new User(
          userDto.username,
          userDto.email,
          userDto.password,
          new Date(),
          new Date(),
        ),
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to create user: ${message}`);
    }
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    try {
      return await this.userService.getUserById(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`User not found: ${message}`);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UpdateUserDto,
  ): Promise<User> {
    try {
      return await this.userService.updateUser(id, userDto as Partial<User>);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new BadRequestException(`Failed to update user: ${message}`);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.userService.deleteUser(id);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unknown error';
      throw new NotFoundException(`Failed to delete user: ${message}`);
    }
  }
}
