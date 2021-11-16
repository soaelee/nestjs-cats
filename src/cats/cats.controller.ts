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

  // cats
  //@UseFilters(HttpExceptionFilter)
  @Get()
  getAllCat() {
    //throw new HttpException('api broken', 401);
    return 'all cats';
  }

  // cats/:id
  @Get(':id')
  getOneCat(@Param('id', ParseIntPipe, ValidationPipe) id: number) {
    console.log('hello, controller');
    return 'a cat';
  }
  // cats
  @Post()
  createCat(@Body() body: Body) {
    return;
  }

  @Put(':id')
  updateCat(@Param('id') id: number, @Body() body: Body) {
    return;
  }

  @Patch(':id')
  updatePartialCat(@Param('id') id: number) {
    return;
  }

  @Delete(':id')
  deleteCat(@Param('id') id: number) {
    return;
  }
}
