import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUseCase } from '../../application/use-cases/login.use-case';
import { RegisterUseCase } from '../../application/use-cases/register.use-case';
import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { Public } from '../decorators/public.decorator';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { cookieConfig } from 'src/core/config/cookie/cookie.config';

@Controller('auth')
@ApiTags('Auth Public')
@Public()
export class AuthPublicController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  @Post('login')
  @ApiOperation({
    summary: 'Fazer login',
    description:
      'Autentica o usuário e retorna um token JWT (cookie + response)',
  })
  @ApiResponse({
    status: 200,
    description: 'Login realizado com sucesso. Token JWT armazenado no cookie.',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Credenciais inválidas' })
  @ResponseMessage('Login realizado com sucesso')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.loginUseCase.execute(dto);

    if (result?.token) {
      response.cookie('token', result.token, cookieConfig);

      const { token, ...dataWithoutToken } = result;
      return dataWithoutToken;
    }

    return result;
  }

  @Post('register')
  @ApiOperation({
    summary: 'Registrar novo usuário',
    description: 'Cria uma nova conta de usuário e retorna token JWT',
  })
  @ApiResponse({
    status: 201,
    description:
      'Usuário registrado com sucesso. Token JWT armazenado no cookie.',
  })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 409, description: 'Email já cadastrado' })
  @ResponseMessage('Registro realizado com sucesso')
  async register(
    @Body() dto: RegisterDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const result = await this.registerUseCase.execute(dto);

    if (result?.token) {
      response.cookie('token', result.token, cookieConfig);

      const { token, ...dataWithoutToken } = result;
      return dataWithoutToken;
    }

    return result;
  }

  @Post('logout')
  @ApiOperation({
    summary: 'Fazer logout',
    description: 'Remove o token JWT do cookie',
  })
  @ApiResponse({
    status: 200,
    description: 'Logout realizado com sucesso',
  })
  @ResponseMessage('Logout realizado com sucesso')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.cookie('token', '', { ...cookieConfig, maxAge: 0 });

    return { message: 'Logout realizado com sucesso' };
  }
}
