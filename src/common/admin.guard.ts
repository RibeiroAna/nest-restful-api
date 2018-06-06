import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const user = context.args[0].user['http://localhost:3000/roles'];
    if (user.indexOf('admin') > -1) {
      return true;
    } else {
      return false;
    }
  }
}
