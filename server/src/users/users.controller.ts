import { Body, Controller, Get, Param, Post, Session, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { ChangeRoleDto } from './dtos/change-role.dto';
import { Role } from 'src/decorators/roles-auth.decorator';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signin(body);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get('/:email')
  findUser(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Role('ADMIN')
  @UseGuards(RoleGuard)
  @Post('/role')
  changeRole(@Body() body: ChangeRoleDto) {
    return this.usersService.changeRole(body);
  }
}
