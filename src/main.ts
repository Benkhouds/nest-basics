import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // transform when set true would enable casting the received object to The desired class
  //so the received body would be an instance of the designated class
  // also it would try to cast query parameters to their expected format
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: 'docs', method: RequestMethod.GET }],
  });
  await app.listen(3000);
}
bootstrap();
