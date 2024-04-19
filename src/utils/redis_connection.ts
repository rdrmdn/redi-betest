import { createClient } from 'redis';

export type RedisClient = ReturnType<typeof createClient>;

export async function RedisConnection(): Promise<RedisClient> {
  return createClient({
    url: process.env.REDIS_URL
  })
    .on('error', err => console.log('Redis Client Error', err))
    .connect();
}
