import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { RsLoggerService } from './utils/services/logger.service';

async function bootstrap() {
  const config = new ConfigService();
  const PORT = config.get<number>('PORT');
  const app = await NestFactory.create(AppModule, {
    logger: new RsLoggerService(config),
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home library')
    .setDescription('The home library API description')
    .setVersion('1.0')
    .addTag('doc')
    .build();

  const doc = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('doc', app, doc);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(PORT || 4000);
}
bootstrap();
