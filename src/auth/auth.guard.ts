import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ERROR_MSG } from 'src/utils/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private jwtService = new JwtService();

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) throw new UnauthorizedException(ERROR_MSG.NOT_AUTHORIZED);
    const jwtSecret =
      new ConfigService().get<string>('JWT_SECRET_KEY') || 'Net voyne!';
    try {
      const payload = this.jwtService.verifyAsync(token, { secret: jwtSecret });
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException(ERROR_MSG.NOT_AUTHORIZED);
    }
    return true;
  }

  private getToken(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
