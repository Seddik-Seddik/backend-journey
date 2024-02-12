import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { BaseInterceptor } from '@base/base.interceptor';
import { ConfigService } from '@config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.getMiscConfig().port;

  const { uri } = configService.getFrontConfig();

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new BaseInterceptor());
  app.useLogger(['log', 'error', 'warn']);
  app.enableCors({
    origin: [uri],
  });

  await app.listen(PORT);
}
bootstrap();
