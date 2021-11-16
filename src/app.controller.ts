import { CatsService } from './cats/cats.service';
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly catsService: CatsService,
  ) {}

  @Get()
  getAllCats() {
    return this.catsService.getHello();
  }
}
