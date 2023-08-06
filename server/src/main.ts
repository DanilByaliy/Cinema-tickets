import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(
    cookieSession({
      keys: ['key'],
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService = app.get<ConfigService>(ConfigService);

  const HOST = configService.get('NEST_HOST');
  const PORT = configService.get('NEST_PORT');
  const GLOBAL_PREFIX = configService.get('GLOBAL_PREFIX');

  app.setGlobalPrefix(GLOBAL_PREFIX);

  await app.listen(PORT, HOST, () => {
    console.log(`Server listens on http://${HOST}:${PORT}`);
  });
}
bootstrap();
