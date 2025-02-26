import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Bebidas', description: 'Nome da categoria' })
  name: string;

  @ApiProperty({
    example: '60d21b4667d0d8992e610c85',
    description: 'ID do menu ao qual a categoria pertence',
  })
  menuId: string;

  @ApiProperty({
    example: ['60d21b4967d0d8992e610c86', '60d21b4967d0d8992e610c87'],
    description: 'Lista de IDs dos produtos pertencentes à categoria',
    required: false,
  })
  productIds?: string[];
}

export class UpdateCategoryDto {
  @ApiProperty({
    example: 'Sobremesas',
    description: 'Nome da categoria',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: '60d21b4667d0d8992e610c85',
    description: 'ID do menu ao qual a categoria pertence',
    required: false,
  })
  menuId?: string;

  @ApiProperty({
    example: ['60d21b4967d0d8992e610c86', '60d21b4967d0d8992e610c87'],
    description: 'Lista de IDs dos produtos pertencentes à categoria',
    required: false,
  })
  productIds?: string[];
}
