import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeormModule } from './core/config/typeorm/typeorm.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { throttleConfig } from './core/config/throttle/throttle.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/infra/guards/jwt-auth.guard';
import { RolesGuard } from './modules/auth/infra/guards/roles.guard';
import { ProjectModule } from './modules/project/project.module';

@Module({
  imports: [
    TypeormModule,
    ThrottlerModule.forRoot([
      {
        ttl: throttleConfig.ttl,
        limit: throttleConfig.limit,
      },
    ]),
    AuthModule,
    UserModule,
    ProjectModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
