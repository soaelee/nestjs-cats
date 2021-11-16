import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { ValidationPipe } from 'src/pipes/positiveInt.pipe';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptors';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get()
  getCurrentCat() {
    // 현재 로그인 한 고양이
    return 'current cat';
  }

  @Post()
  signUp() {
    return 'signUp';
  }

  @Post('login')
  logIn() {
    return 'logIn';
  }

  @Post('logout')
  logOut() {
    return 'logOut';
  }

  @Post('upload/cats')
  uploadCatImg() {
    return 'uploadImg';
  }
}
