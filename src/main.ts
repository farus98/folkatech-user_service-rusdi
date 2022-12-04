import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ResponseErrorGlobal} from "./middleware/interceptor/response/error"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ResponseErrorGlobal());
  await app.listen(3000);
}
bootstrap();
