import { Module } from '@nestjs/common';
import { UserService } from '@/core/domain/services/user.service';
import { UserController } from '@/infrastructure/http/controllers/user.controller';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';
import { IUserRepositoryToken } from '@/core/domain/repositories/user.repository';
import { CreateUserUseCase } from '@/core/use-cases/user/create-user.usecase';
import { GetUserByIdUseCase } from '@/core/use-cases/user/get-user.usecase';
import { UpdateUserUseCase } from '@/core/use-cases/user/update-user.usecase';
import { DeleteUserUseCase } from '@/core/use-cases/user/delete-user.usecase';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: IUserRepositoryToken,
      useClass: UserRepository,
    },
  ],
  exports: [
    UserService,
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
})
export class UserModule {}
