import { Global, Module } from "@nestjs/common";
import { ConfigService } from '@nestjs/config';
import { RedisModule } from './redis.module'
import { RedisService } from "@/src/service/redis.service";
@Global()
@Module({  
  imports: [
    RedisModule.registerAsync({
      useFactory: async (config: ConfigService) => ({
        host: config.get<string>('redis.host'),
        port: config.get<number>('redis.port'),
        password: config.get<string>('redis.password'),
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    RedisService
  ],
  exports: [RedisService],
})
export class GlobalModule {}