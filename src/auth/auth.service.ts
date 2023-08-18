import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  signup(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  login(createUserDto: CreateUserDto) {
    return 'This action authentificate user';
  }

  refreshToken(token: string) {
    return `This action refresh token when it expired`;
  }
}
