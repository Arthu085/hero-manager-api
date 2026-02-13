import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { envConfig } from '../env/env.config';

export const corsConfig: CorsOptions = {
  origin: envConfig.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Accept'],
};
