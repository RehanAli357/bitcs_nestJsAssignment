import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserService } from 'src/user/user.service';

@Injectable()
export class CatsGuard implements CanActivate {
  constructor(
    private UserService: UserService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const endpointPermissions = this.reflector.get<number>(
      'endpointPermissions',
      context.getHandler(),
    );
    if (!endpointPermissions) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']; 
    const user = request.body;
    
    const data = await this.UserService.getUserDetails(user.userId);
    if (token.startsWith('Bearer ') && token.split(' ')[1] === data.token) {
      console.log(data.level,endpointPermissions)
      if (data && user.userId && data.level >= endpointPermissions) {
        return true;
      }
    } else {
      return false;
    }
  }
}
