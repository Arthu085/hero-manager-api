import { Module } from '@nestjs/common';
import { TypeormModule } from './core/config/typeorm/typeorm.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttleConfig } from './core/config/throttle/throttle.config';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeormModule,
    ThrottlerModule.forRoot([
      {
        ttl: throttleConfig.ttl,
        limit: throttleConfig.limit,
      },
    ]),
    UserModule,
  ],
})
export class AppModule {}
