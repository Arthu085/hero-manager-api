import { envConfig } from '../env/env.config';

export const jwtConfig = {
  secret: envConfig.JWT_SECRET,
  signOptions: {
    expiresIn: envConfig.JWT_EXPIRES_IN,
  },
};
