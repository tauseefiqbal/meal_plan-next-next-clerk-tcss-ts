// Rate Limiting Helper
// TODO: Implement actual rate limiting for production
// Consider using: upstash/ratelimit, @vercel/kv, or redis

// For now, this is a placeholder structure showing where rate limiting should be added

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

export const rateLimits = {
  // AI meal plan generation - expensive operation
  mealPlanGeneration: {
    maxRequests: 10, // 10 requests per window
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // Checkout/payment operations
  checkout: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  // Profile operations
  profileUpdate: {
    maxRequests: 20,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  // General API calls
  general: {
    maxRequests: 100,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
} as const;

/**
 * TODO: Implement rate limiting middleware
 * 
 * Recommended approach for Vercel:
 * 1. Use Vercel KV (Redis) or Upstash Redis
 * 2. Install: npm install @upstash/ratelimit @upstash/redis
 * 3. Create rate limiter:
 * 
 * import { Ratelimit } from "@upstash/ratelimit";
 * import { Redis } from "@upstash/redis";
 * 
 * const redis = new Redis({
 *   url: process.env.UPSTASH_REDIS_REST_URL,
 *   token: process.env.UPSTASH_REDIS_REST_TOKEN,
 * });
 * 
 * export const mealPlanRateLimit = new Ratelimit({
 *   redis,
 *   limiter: Ratelimit.slidingWindow(10, "1 h"),
 * });
 * 
 * Then in your API routes:
 * const identifier = userId || ip;
 * const { success } = await mealPlanRateLimit.limit(identifier);
 * if (!success) return NextResponse.json({ error: "Too many requests" }, { status: 429 });
 */

export function getRateLimitIdentifier(
  userId: string | null,
  ip: string | null
): string {
  // Use userId if available, otherwise fall back to IP
  return userId || ip || "anonymous";
}
