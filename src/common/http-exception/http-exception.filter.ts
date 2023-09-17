import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    Logger,
  } from '@nestjs/common';
  import { ApiException } from './api-exception';
  
  @Catch(HttpException)
  export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      const request = ctx.getRequest();
      const status = exception.getStatus()
      if (exception instanceof ApiException) {
        response
          .status(200)
          .json({
            statusCode: exception.getErrorCode(),
            message: exception.getErrorMessage(),
            data: {},
            url: request.url,
          });
  
      } else {
  
        response
          .status(status)
          .json({
            statusCode: status,
            message: new Date().toLocaleDateString(),
            url: request.url,
          });
      }
    }
  }