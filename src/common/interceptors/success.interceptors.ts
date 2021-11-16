import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/* NestInterceptor를 Success data filter로 이용하기
* post-interceptor 오기전에 에러나면 exception-filter로
nest cli : nest g middleware logger
usage : controller class에 @UseInterceptors(SuccessInterceptor)
*/

@Injectable()
export class SuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // pre-interceptor
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    ); // post-interceptor
  }
}

/**
 * service의 return 값 데이터를 가공할 때 많이 사용
 */
