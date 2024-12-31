import { Inject, Injectable } from '@nestjs/common';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class SessionService {
  @Inject(RedisService)
  private redisService: RedisService;

  async getSession<T>(sid: string): Promise<T>;
  getSession(sid: string) {
    if (!sid) return {};
    return this.redisService.hashGet(`sid_${sid}`);
  }
  async setSession(
    sid: string,
    value: Record<string, any>,
    ttl: number = 30 * 60,
  ) {
    const id = sid ?? this.getRandomSid();
    await this.redisService.hashSet(`sid_${id}`, value, ttl);
    return id;
  }

  getRandomSid() {
    return Math.random().toString().slice(2);
  }
}
