import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from '../../../../shared/interfaces/user-payload.interface';

export const CurrentUser = createParamDecorator(
  (data: keyof UserPayload | 'uuid' | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user as UserPayload;

    if (data === 'uuid') {
      return user?.uuid;
    }

    return data ? user?.[data as keyof UserPayload] : user;
  },
);
