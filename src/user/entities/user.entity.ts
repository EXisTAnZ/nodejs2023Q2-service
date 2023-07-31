import { ApiHideProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { v4 } from 'uuid';

export class User {
  public id: string;
  public login: string;
  @Exclude()
  @ApiHideProperty()
  public password: string;
  private version: number;
  private createdAt: number;
  private updatedAt: number;

  constructor(login: string, password: string) {
    this.id = v4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = new Date().getTime();
  }

  public update(newPassword: string) {
    this.password = newPassword;
    this.version++;
    this.updatedAt = new Date().getTime();
  }
}
