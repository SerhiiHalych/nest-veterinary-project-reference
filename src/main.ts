/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './AppModule';
import { HttpExceptionFilter } from './common/infrastructure/filters/HttpExceptionFilter';
import { ValidationFilter } from './common/infrastructure/filters/ValidationFilter';

process.on('unhandledRejection', (error) => {
  console.error('unhandledRejection', { error });
});

process.on('uncaughtException', (error) => {
  console.error('uncaughtException', { error });
});

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new HttpExceptionFilter(), new ValidationFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DoctorVet API')
    .setVersion('1.0')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('api', app, swaggerDocument);

  await app.listen(3000);
}

bootstrap();
