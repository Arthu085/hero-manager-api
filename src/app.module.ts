import { Module } from '@nestjs/common';
import { TypeormModule } from './core/config/typeorm/typeorm.module';

@Module({
  imports: [TypeormModule],
})
export class AppModule {}
