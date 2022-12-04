import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import { Cache } from 'cache-manager'

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER)
    private cacheService: Cache,
  ) {}

  public async Get(key: string) {
    return JSON.parse(await this.cacheService.get<string>(key))
  }

  public async Save(key: string, data: any, ttl:any) {
    return await this.cacheService.set(key, JSON.stringify(data),ttl)
  }

  public async Delete(key: string) {
    return await this.cacheService.del(key)
  }
}
