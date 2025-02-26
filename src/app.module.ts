import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Prisma
import { PrismaModule } from '@/infrastructure/database/prisma.module';

// Auth
import { AuthModule } from '@/infrastructure/auth/auth.module';
import { JwtStrategy } from '@/infrastructure/auth/jwt.strategy';

// Product
import { ProductController } from '@/infrastructure/http/controllers/product.controller';
import { ProductService } from '@/core/domain/services/product.service';
import { ProductRepository } from '@/infrastructure/database/repositories/product.repository';
import { IProductRepositoryToken } from '@/core/domain/repositories/product.repository';
import { CreateProductUseCase } from '@/core/use-cases/product/create-product.usecase';
import { GetProductUseCase } from '@/core/use-cases/product/get-product.usecase';
import { UpdateProductUseCase } from '@/core/use-cases/product/update-product.usecase';
import { DeleteProductUseCase } from '@/core/use-cases/product/delete-product.usecase';

// Category
import { CategoryController } from '@/infrastructure/http/controllers/category.controller';
import { CategoryService } from '@/core/domain/services/category.service';
import { CategoryRepository } from '@/infrastructure/database/repositories/category.repository';
import { ICategoryRepositoryToken } from '@/core/domain/repositories/category.repository';
import { CreateCategoryUseCase } from '@/core/use-cases/category/create-category.usecase';
import { GetCategoryByIdUseCase } from '@/core/use-cases/category/get-category.usecase';
import { UpdateCategoryUseCase } from '@/core/use-cases/category/update-category.usecase';
import { DeleteCategoryUseCase } from '@/core/use-cases/category/delete-category.usecase';
import { GetCategoryWithProductsUseCase } from '@/core/use-cases/category/get-category-with-products';

// Menu
import { MenuController } from '@/infrastructure/http/controllers/menu.controller';
import { MenuService } from '@/core/domain/services/menu.service';
import { MenuRepository } from '@/infrastructure/database/repositories/menu.repository';
import { IMenuRepositoryToken } from '@/core/domain/repositories/menu.repository';
import { CreateMenuUseCase } from '@/core/use-cases/menu/create-menu.usecase';
import { GetMenuByIdUseCase } from '@/core/use-cases/menu/get-menu.usecase';
import { GetDailyMenusUseCase } from '@/core/use-cases/menu/get-daily-menu.usecase';
import { UpdateMenuUseCase } from '@/core/use-cases/menu/update-menu.usecase';
import { DeleteMenuUseCase } from '@/core/use-cases/menu/delete-menu.usecase';

// User
import { UserController } from '@/infrastructure/http/controllers/user.controller';
import { UserService } from '@/core/domain/services/user.service';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';
import { IUserRepositoryToken } from '@/core/domain/repositories/user.repository';
import { CreateUserUseCase } from '@/core/use-cases/user/create-user.usecase';
import { GetUserByIdUseCase } from '@/core/use-cases/user/get-user.usecase';
import { UpdateUserUseCase } from '@/core/use-cases/user/update-user.usecase';
import { DeleteUserUseCase } from '@/core/use-cases/user/delete-user.usecase';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'S3CR3TK3Y',
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
        },
      }),
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 60, // Cache por 60 segundos (1 minuto)
      max: 100, // Número máximo de itens no cache
    }),
  ],
  controllers: [
    ProductController,
    CategoryController,
    MenuController,
    UserController,
  ],
  providers: [
    // User
    UserService,
    CreateUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    {
      provide: IUserRepositoryToken,
      useClass: UserRepository,
    },

    // Product
    ProductService,
    CreateProductUseCase,
    GetProductUseCase,
    UpdateProductUseCase,
    DeleteProductUseCase,
    {
      provide: IProductRepositoryToken,
      useClass: ProductRepository,
    },

    // Category
    CategoryService,
    CreateCategoryUseCase,
    GetCategoryByIdUseCase,
    UpdateCategoryUseCase,
    DeleteCategoryUseCase,
    GetCategoryWithProductsUseCase,
    {
      provide: ICategoryRepositoryToken,
      useClass: CategoryRepository,
    },

    // Menu
    MenuService,
    CreateMenuUseCase,
    GetMenuByIdUseCase,
    GetDailyMenusUseCase,
    UpdateMenuUseCase,
    DeleteMenuUseCase,
    {
      provide: IMenuRepositoryToken,
      useClass: MenuRepository,
    },

    // Auth
    JwtStrategy,
  ],
})
export class AppModule {}
