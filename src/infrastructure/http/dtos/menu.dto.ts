import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateMenuDto {
  @ApiProperty({ example: 'day', description: 'Turno do menu (day ou night)' })
  @IsEnum(['day', 'night'], { message: 'O turno deve ser "day" ou "night"' })
  shift: 'day' | 'night';

  @ApiProperty({
    example: ['67be0ba89766dd30e0524095', '67be6a68c71ea3e6e1013d81'],
    description: 'Lista de IDs das categorias associadas ao menu',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Os IDs das categorias devem estar em um array' })
  @IsString({ each: true, message: 'Cada ID deve ser uma string' })
  categoryIds?: string[];
}

export class UpdateMenuDto {
  @ApiProperty({
    example: 'night',
    description: 'Turno do menu (day ou night)',
    required: false,
  })
  @IsOptional()
  @IsEnum(['day', 'night'], { message: 'O turno deve ser "day" ou "night"' })
  shift?: 'day' | 'night';

  @ApiProperty({
    example: ['67be0ba89766dd30e0524095', '67be6a68c71ea3e6e1013d81'],
    description: 'Lista de IDs das categorias associadas ao menu',
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'Os IDs das categorias devem estar em um array' })
  @IsString({ each: true, message: 'Cada ID deve ser uma string' })
  categoryIds?: string[];
}
