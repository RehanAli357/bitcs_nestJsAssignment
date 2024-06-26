import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { BycrptService } from './bycrypt.service';

@Injectable()
export class UserService {
  constructor(
    private ByCryptService: BycrptService,
    private jwtService: JwtService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async addUser(name: string, pswd: string, level: number): Promise<User> {
    const password = await this.ByCryptService.createHash(pswd);
    const createdTime = new Date();
    return await this.userRepository.save({
      name,
      password,
      createdTime,
      level,
    });
  }

  deleteUser(id: number) {
    return this.userRepository.delete(id);
  }

  async login(user: any) {
    console.log(user)
    const payload = { name: user.name, id: user.id };
    const token = this.jwtService.sign(payload);
    await this.userRepository.update(user.id, { token });
    return {
      accessToken: token,
      id: user.id,
      name: user.name,
      level: user.level,
    };
  }

  async loginUser(name: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { name } });

    if (user) {
      const match = await this.ByCryptService.compareHash(
        password,
        user.password,
      );
      if (match) {
        return user;
      } else {
        return null;
      }
    }
    return null;
  }

  async getUserDetails(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
}
