import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({ usernameField: 'name' });
  }
  async validate(name: string, passowrd: string): Promise<any> {
    const user = await this.userService.loginUser(name, passowrd);
    if (!user) {
      throw new BadRequestException({message:"Invalid Name or password"});
    } else {
      return user;
    }
  }
}
