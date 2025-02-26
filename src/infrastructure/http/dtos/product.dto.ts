import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Coca-Cola', description: 'Nome do produto' })
  name: string;

  @ApiProperty({
    example: 'Refrigerante gelado de 350ml',
    description: 'Descrição breve do produto',
  })
  description: string;

  @ApiProperty({ example: 5.99, description: 'Preço do produto' })
  price: number;

  @ApiProperty({
    example: 'https://example.com/coca-cola.png',
    description: 'URL da imagem do produto',
  })
  imageUrl: string;

  @ApiProperty({
    example: '60d21b4967d0d8992e610c86',
    description: 'ID da categoria à qual o produto pertence',
  })
  categoryId: string;
}

export class UpdateProductDto {
  @ApiProperty({
    example: 'Coca-Cola Zero',
    description: 'Nome do produto',
    required: false,
  })
  name?: string;

  @ApiProperty({
    example: 'Refrigerante gelado sem açúcar de 350ml',
    description: 'Descrição breve do produto',
    required: false,
  })
  description?: string;

  @ApiProperty({
    example: 6.49,
    description: 'Preço do produto',
    required: false,
  })
  price?: number;

  @ApiProperty({
    example: 'https://example.com/coca-cola-zero.png',
    description: 'URL da imagem do produto',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    example: '60d21b4967d0d8992e610c86',
    description: 'ID da categoria à qual o produto pertence',
    required: false,
  })
  categoryId?: string;
}
