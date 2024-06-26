import { Injectable, NotFoundException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private userService: UserService) {
    super();
  }

  async validate(id: number): Promise<any> {
    console.log("first")
    const user = await this.userService.getUserDetails(1); // Assuming this method exists in UserService
    console.log(user)
    if (!user) {
      console.log("first")
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
