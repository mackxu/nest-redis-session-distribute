import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

export const REDIS_ClIENT_PROVIDE = 'REDIS_ClIENT';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: REDIS_ClIENT_PROVIDE,
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        await client.connect();
        return client;
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
