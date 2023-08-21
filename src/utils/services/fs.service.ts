import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { rename, stat, writeFile } from 'fs/promises';
import { resolve } from 'path';

@Injectable()
export class FsService {
  private logFilePath: string;
  private errFilePath: string;

  constructor(private configService: ConfigService) {
    const LOG_DIR = 'logs';
    const logName = this.configService.get('LOG_FILE_NAME') || 'log.txt';
    const errName = this.configService.get('ERR_FILE_NAME') || 'err.txt';
    this.logFilePath = resolve(LOG_DIR, logName);
    this.errFilePath = resolve(LOG_DIR, errName);
  }
  public async writeMessageToFile(message: string, isErr: boolean) {
    const filePath = isErr ? this.errFilePath : this.logFilePath;
    writeFile(filePath, message, { flag: 'a' });
    await this.logFileRotate(filePath);
  }

  private async logFileRotate(filePath: string) {
    const sizeLimit = this.configService.get<number>('LOG_FILE_SIZE') || 100000;
    const { size } = await stat(filePath);
    if (size > sizeLimit) {
      rename(filePath, filePath + '.bac');
    }
  }
}
