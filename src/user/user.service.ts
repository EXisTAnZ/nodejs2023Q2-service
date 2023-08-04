import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import DBEngine from 'src/db/db.engine';

@Injectable()
export class UserService {
  private dbEngine: DBEngine = new DBEngine();

  create(createUserDto: CreateUserDto) {
    return this.dbEngine.addUser(createUserDto);
  }

  findAll() {
    return this.dbEngine.getUsers();
  }

  findOne(id: string) {
    return this.dbEngine.getUser(id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    return this.dbEngine.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.dbEngine.deleteUser(id);
  }
}
