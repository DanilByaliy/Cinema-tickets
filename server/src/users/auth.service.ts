import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { UsersService } from './users.service';
import { EmailsService } from 'src/emails/emails.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { CreateUserDto } from './dtos/create-user.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private emailsService: EmailsService,
    @Inject(CACHE_MANAGER)
    private cacheService: Cache,
  ) {}

  async signup(body: CreateUserDto) {
    const { email, password } = body;
    const existingUser = await this.usersService.findOneByEmail(email);
    if (existingUser) throw new BadRequestException('Email in use');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    const user = await this.usersService.create({ email, password: result });

    const token = randomBytes(32).toString('hex');
    await this.emailsService.sendVerificationLetter(user.email, user.id, token);
    await this.cacheService.set(user.id, token);

    return user;
  }

  async signin(body: CreateUserDto) {
    const { email, password } = body;
    const user = await this.usersService.findOneByEmail(email);
    if (!user) throw new NotFoundException('User not found');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Bad password');
    }
    return user;
  }

  async verify(id: string, token: string) {
    const receivedToten = await this.cacheService.get(id);
    if (!receivedToten || receivedToten !== token)
      throw new BadRequestException('Invalid link');

    await this.usersService.verifyUserById(id);
    await this.cacheService.del(id);
  }
}
