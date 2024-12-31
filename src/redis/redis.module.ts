import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

export const REDIS_ClIENT_PROVIDE = 'REDIS_ClIENT';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_ClIENT',
      async useFactory() {
        const client = createClient({
          socket: {
            host: 'localhost',
            port: 6379,
          },
        });
        try {
          await client.connect();
          return client;
        } catch (error) {
          console.log('redis conn error: \n', error);
        }
      },
    },
  ],
  exports: [RedisService],
})
export class RedisModule {}
