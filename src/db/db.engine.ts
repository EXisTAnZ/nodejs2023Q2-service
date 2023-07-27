import { userCollection } from './db';
import { pbkdf2Sync } from 'crypto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/entities/user.entity';
import { ERROR_MSG } from 'src/utils/constants';

export default class DBEngine {
  public async getUsers(): Promise<User[]> {
    return userCollection;
  }

  public async getUser(userId: string) {
    return userCollection.find((item) => item.id === userId);
  }

  public async addUser(user: CreateUserDto) {
    const { login, password } = user;
    try {
      const newUser: User = new User(login, this.hashPass(password));
      userCollection.push(newUser);
      return newUser;
    } catch (err) {
      console.log(err.message);
    }
  }

  public async updateUser(userId: string, user: UpdateUserDto) {
    this.existedUser(userId).password = this.hashPass(user.newPassword);
  }

  public async deleteUser(userId: string) {
    userCollection.filter((user) => user.id !== userId);
  }

  public existedLogin(login: string) {
    return userCollection.find((user) => user.login === login);
  }

  public existedUser(userId: string) {
    return userCollection.find((user) => user.id === userId);
  }

  public isAccess(user: User, password: string) {
    return user.password === this.hashPass(password);
  }

  private hashPass(password: string) {
    return pbkdf2Sync(password, 'secret', 5, 64, 'sha256').toString();
  }

  public userValidator(user: User) {
    const { login, password } = user;
    const regexp = /^[a-zA-Z0-9@.а-яА-Я_-]+$/;
    if (!login || login.length < 5) throw new Error(ERROR_MSG.SHORT_USERNAME);
    if (!login.match(regexp)) throw new Error(ERROR_MSG.INVALID_USERNAME);
    if (!password || password.length < 5)
      throw new Error(ERROR_MSG.SHORT_PASSWORD);
  }
}
