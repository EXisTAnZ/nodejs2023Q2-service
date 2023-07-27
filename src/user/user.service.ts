import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import DBEngine from 'src/db/db.engine';
import { ERROR_MSG } from 'src/utils/constants';

@Injectable()
export class UserService {
  private dbEngine: DBEngine = new DBEngine();

  create(createUserDto: CreateUserDto) {
    if (this.dbEngine.existedLogin(createUserDto.login))
      throw new ForbiddenException(ERROR_MSG.LOGIN_IS_USED);
    return this.dbEngine.addUser(createUserDto);
  }

  findAll() {
    return this.dbEngine.getUsers();
  }

  findOne(id: string) {
    const user = this.dbEngine.existedUser(id);
    if (!user) throw new NotFoundException(ERROR_MSG.NOT_FOUND_USER);
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.dbEngine.existedUser(id);
    if (!user) throw new NotFoundException(ERROR_MSG.NOT_FOUND_USER);
    if (!this.dbEngine.isAccess(user, updateUserDto.oldPassword))
      throw new ForbiddenException(ERROR_MSG.WRONG_PASSWORD);
    this.dbEngine.updateUser(user.id, updateUserDto);
    return user;
  }

  remove(id: string) {
    const user = this.dbEngine.existedUser(id);
    if (!user) throw new NotFoundException(ERROR_MSG.NOT_FOUND_USER);
    this.dbEngine.deleteUser(user.id);
  }
}
