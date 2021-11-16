import { ValidationPipe } from 'src/pipes/positiveInt.pipe';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe()); // class-validatotion 수행
  const PORT = process.env.PORT;
  await app.listen(PORT);
}
bootstrap();
