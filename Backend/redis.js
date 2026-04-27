const { createClient } = require("redis");

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = createClient({ url: process.env.REDIS_URL || "redis://localhost:6379" });
    redisClient.on("error", (err) => console.warn("Redis error (caching disabled):", err.message));
    await redisClient.connect();
    console.log("Redis connected — caching enabled");
  } catch {
    console.warn("Redis unavailable — running without cache");
    redisClient = null;
  }
};

/**
 * Get a cached value. Returns null if Redis is down or key not found.
 */
const getCache = async (key) => {
  if (!redisClient) return null;
  try {
    const val = await redisClient.get(key);
    return val ? JSON.parse(val) : null;
  } catch {
    return null;
  }
};

/**
 * Set a cache value with a TTL in seconds.
 */
const setCache = async (key, value, ttlSeconds = 300) => {
  if (!redisClient) return;
  try {
    await redisClient.setEx(key, ttlSeconds, JSON.stringify(value));
  } catch {
    // Silently ignore — caching is a performance optimisation, not critical
  }
};

const deleteCache = async (key) => {
  if (!redisClient) return;
  try { await redisClient.del(key); } catch { /* noop */ }
};

module.exports = { connectRedis, getCache, setCache, deleteCache };
