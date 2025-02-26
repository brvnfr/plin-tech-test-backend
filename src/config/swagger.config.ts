import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

export const swaggerConfig: OpenAPIObject = new DocumentBuilder()
  .setTitle('Plin Tech API')
  .setDescription('API para gerenciar cardápios com autenticação JWT')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      in: 'header',
      name: 'Authorization',
      description: 'Insira o token JWT sem o prefixo "Bearer"',
    },
    'JWT',
  )
  .build() as OpenAPIObject;
