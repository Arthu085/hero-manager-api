import { Module } from '@nestjs/common';
import { TypeormModule } from './core/config/typeorm/typeorm.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttleConfig } from './core/config/throttle/throttle.config';

@Module({
  imports: [
    TypeormModule,
    ThrottlerModule.forRoot([
      {
        ttl: throttleConfig.ttl,
        limit: throttleConfig.limit,
      },
    ]),
  ],
})
export class AppModule {}
