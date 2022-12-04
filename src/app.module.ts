import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { redisConfig } from "./config/redis";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { RedisModule } from './helpers/redis/redis.module';
import {User, UserSchema} from "./schema/user.schema"

@Module({
  imports: [
    // MongooseModule.forRoot(process.env.MONGOOSE_HOST), 
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [
        redisConfig
      ]
    }),
    RedisModule,
    CacheModule.registerAsync({
      useFactory: (config: ConfigService) => config.get("redis"),
      inject: [ConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
