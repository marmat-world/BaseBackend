import {
    Injectable,
    NestInterceptor,
    CallHandler,
    ExecutionContext,
    Logger,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  import { Request } from 'express';
  
  interface Response<T> {
    data: T;
  }
  type returnData = {
    pageInfo?:{
      page:number,
      total:number,
    }
    data?:any
    message?: string,
  }
  @Injectable()
  export class TransformInterceptor<T>
    implements NestInterceptor<T, Response<T>>
  {
    intercept(context: ExecutionContext, next: CallHandler<T&returnData>): Observable<any> {
      const request = context.switchToHttp().getRequest<Request>();
      Logger.log(request.url, '正常接口请求');
      
      return next.handle().pipe(
        map(result => {
          const { pageInfo,data,message } = result;
          return {
            pageInfo: pageInfo ?? null,
            statusCode: 200,
            status: "ok",
            message: message ?? '请求成功',
            data: data ?? null,
          };
        }),
      );
    }
  }
  