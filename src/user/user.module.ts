import { Module } from '@nestjs/common';

import { UserService } from './user.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constant';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/users.entity';
import { BycrptService } from './bycrypt.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService, BycrptService, LocalStrategy, JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  exports:[UserService]
})
export class UserModule {}
