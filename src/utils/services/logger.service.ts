import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { FsService } from './fs.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RsLoggerService extends ConsoleLogger {
  private fsService: FsService;

  constructor(private configService: ConfigService) {
    super();
    this.fsService = new FsService(configService);
    const logLevel = configService.get('LOG_LEVEL') || 3;
    this.setLogLevels(this.getLogLevelsByCode(logLevel));
  }

  log(message: any, context?: string) {
    super.log(message, context);
    this.fsService.writeMessageToFile(
      this.formatMessageLog('log', message),
      false,
    );
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    this.fsService.writeMessageToFile(
      this.formatMessageLog('error', message),
      true,
    );
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    this.fsService.writeMessageToFile(
      this.formatMessageLog('warn', message),
      false,
    );
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    this.fsService.writeMessageToFile(
      this.formatMessageLog('debug', message),
      false,
    );
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    this.fsService.writeMessageToFile(
      this.formatMessageLog('verbose', message),
      false,
    );
  }

  private getLogLevelsByCode(level: number) {
    const LOG_LEVELS: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    return LOG_LEVELS.slice(0, level);
  }

  private formatMessageLog(level: LogLevel, message: string) {
    const timeStamp = new Date();
    return `${timeStamp.toLocaleString()} ${level.toLocaleUpperCase()} ${message}\n`;
  }
}
