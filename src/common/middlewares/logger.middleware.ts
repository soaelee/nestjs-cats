import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Response, Request, NextFunction } from 'express';

/* 미들웨어를 Logger로 이용하기
nest cli : nest g middleware logger
usage : app.module.ts에서 NestModule을 구현해서 configure에 적용
*/

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    // this.logger.log(
    //   `before: ${req.method} ${req.originalUrl} ${req.ip} ${res.statusCode}`,
    // );
    res.on('finish', () => {
      this.logger.log(
        `after: ${req.method} ${req.originalUrl} ${req.ip} ${res.statusCode}`,
      );
    });
    next();
  }
}
