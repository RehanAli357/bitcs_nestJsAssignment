import { Body, Controller, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { userDto } from './dto/users.dto';
import { AuthGuard } from '@nestjs/passport';
import { JoiValidationPipe } from './job/joi-validation.pipe';
import { createJobSchema } from './job/create-job.schema';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(new JoiValidationPipe(createJobSchema))
  addUser(@Body() userDto: userDto) {
    return this.userService.addUser(
      userDto.name,
      userDto.password,
      userDto.level,
    );
  }

  @Post('/login')
  @UseGuards(AuthGuard('local'))
  @UsePipes(new JoiValidationPipe(createJobSchema))
  login(@Request()req:any) {
    return this.userService.login(req.user);
  }

}
