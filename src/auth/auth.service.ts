import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import DBEngine from 'src/db/db.engine';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ERROR_MSG } from 'src/utils/constants';

@Injectable()
export class AuthService {
  private dbEngine: DBEngine = new DBEngine();

  constructor(private jwtService: JwtService, private config: ConfigService) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.dbEngine.addUser(createUserDto);
    return user;
  }

  async login(createUserDto: CreateUserDto) {
    const user = await this.dbEngine.loginUser(createUserDto);
    return this.getTokenPair(user);
  }

  async refreshToken(token: string) {
    const secret = this.config.get<string>('JWT_SECRET_REFRESH_KEY');
    try {
      const payload = this.jwtService.verify(token, { secret });
      if (!payload) throw new Error();
      const user = await this.dbEngine.getUser(payload['userId']);
      return this.getTokenPair(user);
    } catch {
      throw new ForbiddenException(ERROR_MSG.INVALID_REFRESH_TOKEN);
    }
  }

  getTokenPair(user: User) {
    const accessToken = this.createToken(user);
    const refreshToken = this.createRefreshToken(user);
    return { accessToken, refreshToken };
  }

  createToken(user: User) {
    const secret = this.config.get<string>('JWT_SECRET_KEY');
    const expiresIn = this.config.get<string>('TOKEN_EXPIRE_TIME');
    const payload = { userId: user.id, login: user.login };
    return this.jwtService.sign(payload, { secret, expiresIn });
  }

  createRefreshToken(user: User) {
    const secret = this.config.get<string>('JWT_SECRET_REFRESH_KEY');
    const expiresIn = this.config.get<string>('TOKEN_REFRESH_EXPIRE_TIME');
    const payload = { userId: user.id, login: user.login };
    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
