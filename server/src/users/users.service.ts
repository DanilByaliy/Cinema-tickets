import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { ChangeRoleDto } from './dtos/change-role.dto';

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

  async findOne(id: string) {
    const user = await this.repo.findOneBy({ id });
    if (!user) return null;
    return user;
  }

  async changeRole(body: ChangeRoleDto) {
    const { userId, role } = body;
    const user = await this.findOne(userId);
    user.role = role;
    return this.repo.save(user);
  }

  async verifyUserById(id: string) {
    const user = await this.findOne(id);
    user.verified = true;
    return this.repo.save(user);
  }
}
