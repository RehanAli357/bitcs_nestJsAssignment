import { Module } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './cats/entity/cats.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/users.entity';

@Module({
  imports: [
    CatsModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './DB/catsDB.db',
      entities: [Cat,User],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
