/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { JwtService } from '@nestjs/jwt';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<any | boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    // console.log(request);
    if (
      request.path === '/auth/login' ||
      request.path === '/auth/forgot-password' ||
      request.path === '/auth/reset-password' ||
      request.path === '/programs/create-program' ||
      request.path.includes('/api')
    ) {
      return true;
    }
    try {
      const rawJwt = request.headers.cookie;
      const jwt = rawJwt?.split('jwt=')[1];
      const payload = await this.jwtService.verifyAsync(jwt, {
        secret: 'secret',
      });

      request['user'] = payload;
    } catch (error) {
      if (error) {
        throw new UnauthorizedException();
      }
    }

    return true;
  }
}
