import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JWTVerify } from './jwt';

@Injectable()
export class HeaderGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    let forbidden = false;
   
    if (!authorization) {
      forbidden = true;
    }

    let data = await JWTVerify(authorization)

    if(!data) {
      throw new HttpException('Token Not Validate', HttpStatus.FORBIDDEN);
    }

    if (forbidden == true) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    } else {
      request.common_header = {authorization: authorization};
      return true;
    }
  }
}
