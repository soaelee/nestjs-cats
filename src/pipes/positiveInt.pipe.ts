import {
  ArgumentMetadata,
  HttpException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
/* PipeTransform으로 custom pipe만들기*/
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: number, metadata: ArgumentMetadata) {
    if (value < 0) {
      throw new HttpException('value should be positive number', 400);
    }
    return value;
  }
}
