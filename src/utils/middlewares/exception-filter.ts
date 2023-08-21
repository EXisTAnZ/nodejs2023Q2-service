import {
  ExceptionFilter,
  Catch,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { RsLoggerService } from '../services/logger.service';
import { ERROR_MSG } from '../constants';

@Catch()
export class RsExceptionFilter implements ExceptionFilter {
  constructor(private logger: RsLoggerService) {}

  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const { url, method, query, body } = ctx.getRequest();

    const statusCode =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const message =
      exception instanceof HttpException
        ? exception.message
        : ERROR_MSG.SERVER_ERROR;

    const requestInfo = { url, method, query, body };
    const responseInfo = { statusCode, message };

    this.logger.error(JSON.stringify({ requestInfo, responseInfo }));

    ctx.getResponse().status(statusCode).json(responseInfo);
  }
}
