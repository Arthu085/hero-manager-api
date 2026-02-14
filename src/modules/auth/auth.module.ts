import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/core/config/jwt/jwt.config';
import { JwtStrategy } from './infra/strategies/jwt.strategy';
import { UserModule } from '../user/user.module';
import { AuthPublicController } from './infra/controllers/auth-public.controller';
import { AuthProtectedController } from './infra/controllers/auth-protected.controller';
import { AuthDomainService } from './domain/services/auth-domain.service';
import { JwtTokenService } from './domain/services/jwt-token.service';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { RegisterUseCase } from './application/use-cases/register.use-case';
import { FindOneProfileUseCase } from './application/use-cases/find-one-profile.use-case';
import { JwtAuthGuard } from './infra/guards/jwt-auth.guard';
import { RolesGuard } from './infra/guards/roles.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(jwtConfig),
  ],
  controllers: [AuthPublicController, AuthProtectedController],
  providers: [
    AuthDomainService,
    JwtTokenService,
    LoginUseCase,
    RegisterUseCase,
    FindOneProfileUseCase,
    JwtStrategy,
    JwtAuthGuard,
    RolesGuard,
  ],
  exports: [
    AuthDomainService,
    JwtTokenService,
    JwtAuthGuard,
    RolesGuard,
    JwtModule,
  ],
})
export class AuthModule {}
