import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entity/cats.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';

import { LocalStrategy } from './local.strategy';



@Module({
  controllers: [CatsController],
  providers: [CatsService],
  imports: [
    TypeOrmModule.forFeature([Cat]),
    UserModule,
  ],
})
export class CatsModule {}
