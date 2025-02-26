import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'test@example.com', description: 'Email do usuário' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  password: string;
}
