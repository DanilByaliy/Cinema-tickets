import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(body: CreateUserDto) {
    const user = this.repo.create(body);
    return this.repo.save(user);
  }

  async findOneByEmail(email: string) {
    const user = await this.repo.findOneBy({ email });
    if (!user) return null;
    return user;
  }
}
