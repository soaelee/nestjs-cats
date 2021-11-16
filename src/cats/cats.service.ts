import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  getHello() {
    return 'hello';
  }
}
