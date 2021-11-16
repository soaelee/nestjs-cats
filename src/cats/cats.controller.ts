import { HttpExceptionFilter } from '../common/exceptions/http-exception.filter';
import { CatsService } from './cats.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptors';
import { CatRequestDto } from './dtos/cat-request.dto';

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
  @UsePipes(ValidationPipe)
  signUp(@Body() body: CatRequestDto) {
    return this.catsService.signUp(body);
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
