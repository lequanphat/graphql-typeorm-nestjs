import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(2411, () => {
    console.log(`App running on port  ${2411}`);
  });
}
bootstrap();
