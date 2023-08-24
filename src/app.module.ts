import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CacheModule.register(), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
