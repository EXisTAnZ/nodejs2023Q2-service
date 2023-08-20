import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ERROR_MSG } from 'src/utils/constants';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(200)
  @Post('login')
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('refresh')
  @HttpCode(200)
  create(@Body() refreshTokenDto: RefreshTokenDto) {
    if (!refreshTokenDto.refreshToken)
      throw new UnauthorizedException(ERROR_MSG.INVALID_REFRESH_TOKEN);
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }
}
