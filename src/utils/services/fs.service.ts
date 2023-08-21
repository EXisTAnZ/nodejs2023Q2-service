import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { writeFile } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class FsService {
  private logFilePath;
  private errFilePath;

  constructor(private configService: ConfigService) {
    const LOG_DIR = 'logs';
    const logName = this.configService.get('LOG_FILE_NAME') || 'log.txt';
    const errName = this.configService.get('ERR_FILE_NAME') || 'err.txt';
    this.logFilePath = resolve(LOG_DIR, logName);
    this.errFilePath = resolve(LOG_DIR, errName);
  }
  public writeMessageToFile(message: string, isErr: boolean) {
    const filePath = isErr ? this.errFilePath : this.logFilePath;
    writeFile(filePath, message, { flag: 'a' });
  }
}
