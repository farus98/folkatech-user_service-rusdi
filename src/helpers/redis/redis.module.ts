import { CacheModule, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { ConfigService } from '@nestjs/config'

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('redis'),
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
