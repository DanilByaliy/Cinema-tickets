import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';

import { ROLES_KEY } from '../decorators/roles-auth.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context.switchToHttp().getRequest();
    const { userId } = request.session || {};
    const user = await this.usersService.findOne(userId);

    return user && user.role === requiredRole;
  }
}
