import { CookieOptions } from 'express';
import { envConfig } from '../env/env.config';

export const cookieConfig: CookieOptions = {
  httpOnly: true,
  secure: envConfig.NODE_ENV === 'production',
  sameSite: envConfig.NODE_ENV === 'production' ? 'none' : 'lax',
  maxAge: 4 * 60 * 60 * 1000, // 4 horas
};
