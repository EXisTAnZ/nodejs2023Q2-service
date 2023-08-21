import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RsLoggerService } from '../services/logger.service';

@Injectable()
export class RestLogMiddleware implements NestMiddleware {
  constructor(private readonly logger: RsLoggerService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', async () => {
      const { url, method, query, body } = req;
      const { statusCode, statusMessage } = res;
      const requestInfo = { url, method, query, body };
      const responseInfo = { statusCode, message: statusMessage };

      this.logger.log(JSON.stringify({ requestInfo, responseInfo }));
    });

    if (next) {
      next();
    }
  }
}
