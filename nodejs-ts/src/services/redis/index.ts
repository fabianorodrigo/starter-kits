import {createClient} from "redis";

/**
 *
 * @returns a instance of Redis client connected to a Redis Docker instance (redis://@172.17.0.2:6379)
 */
export async function connectLocalRedis() {
  const client = createClient({url: "redis://@172.17.0.2:6379"});
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  return client;
}

/**
 *
 * @param redisClient instance of Redis client
 * @param key Key to be set
 * @param value Single value set for the key
 */
export async function setSingleKey(redisClient, key: string, value: unknown) {
  await redisClient.set(key, value);
}

/**
 *
 * @param redisClient instance of Redis client
 * @param key key to be set
 * @param value Composed object whose each attribute will be set for the key
 */
export async function setComposedKey(
  redisClient,
  key: string,
  value: {[key: string]: string}
) {
  const attributes = Object.keys(value);
  for (const attribute of attributes) {
    await redisClient.hSet(key, attribute, value[attribute]);
  }
}
