import { Inject, Injectable } from '@nestjs/common';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisService {
  @Inject('REDIS_ClIENT')
  private readonly redisClient: RedisClientType;

  async hashGet(key: string) {
    return await this.redisClient.hGetAll(key);
  }
  async hashSet(key: string, value: Record<string, any>, expire: number) {
    await Promise.all(
      Object.entries(value).map(([field, value]) =>
        this.redisClient.hSet(key, field, value),
      ),
    );
    if (expire) {
      await this.redisClient.expire(key, expire);
    }
  }
}
