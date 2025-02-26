import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe' })
  username: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: 'Password123!' })
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'john_doe', required: false })
  username?: string;

  @ApiProperty({ example: 'john.doe@example.com', required: false })
  email?: string;

  @ApiProperty({ example: 'Password123!', required: false })
  password?: string;
}
