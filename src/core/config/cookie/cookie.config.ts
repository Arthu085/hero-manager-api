import { envConfig } from '../env/env.config';

export const cookieConfig = {
  httpOnly: true,
  secure: envConfig.NODE_ENV === 'production',
  sameSite: 'strict',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};
