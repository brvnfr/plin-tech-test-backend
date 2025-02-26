import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
  @ApiProperty({ example: 'day', description: 'Turno do menu (day ou night)' })
  shift: 'day' | 'night';

  @ApiProperty({
    example: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
    description: 'Lista de IDs das categorias associadas ao menu',
    required: false,
  })
  categoryIds?: string[];
}

export class UpdateMenuDto {
  @ApiProperty({
    example: 'night',
    description: 'Turno do menu (day ou night)',
    required: false,
  })
  shift?: 'day' | 'night';

  @ApiProperty({
    example: ['60d21b4667d0d8992e610c85', '60d21b4667d0d8992e610c86'],
    description: 'Lista de IDs das categorias associadas ao menu',
    required: false,
  })
  categoryIds?: string[];
}
