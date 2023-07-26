import { v4 } from 'uuid';

export class User {
  public id: string;
  public login: string;
  public password: string;
  public version: number;
  public createdAt: number;
  public updatedAt: number;

  constructor(login: string, password: string) {
    this.id = v4();
    this.login = login;
    this.password = password;
    this.version = 1;
    this.createdAt = new Date().getTime();
    this.updatedAt = new Date().getTime();
  }

  public update(login: string, newPassword: string) {
    this.login = login;
    this.password = newPassword;
    this.version++;
    this.updatedAt = new Date().getTime();
  }
}
