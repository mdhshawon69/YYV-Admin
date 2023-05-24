/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any | boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const rawJwt = request.headers.cookie;
    const jwt = rawJwt?.split('jwt=')[1];

    try {
      const payload = await this.jwtService.verifyAsync(jwt, {
        secret: 'secret',
      });

      request['user'] = payload;
    } catch (error) {
      return response.redirect('/auth/login');
    }

    return true;
  }
}
