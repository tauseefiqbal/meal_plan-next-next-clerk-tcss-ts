// Environment variable validation
// This ensures all required env vars are present at startup

const requiredEnvVars = [
  "DATABASE_URL",
  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_WEEKLY",
  "STRIPE_PRICE_MONTHLY",
  "STRIPE_PRICE_YEARLY",
  "OPENAI_API_KEY",
] as const;

const optionalEnvVars = [
  "NEXT_PUBLIC_BASE_URL",
  "NODE_ENV",
] as const;

export function validateEnv() {
  const missing: string[] = [];

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      missing.push(envVar);
    }
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n${missing.join("\n")}\n\nPlease check your .env.local file.`
    );
  }

  console.log("✓ All required environment variables are set");
}

// Optional: Validate env on module load in development
if (process.env.NODE_ENV !== "production") {
  try {
    validateEnv();
  } catch (error) {
    console.error(error);
  }
}
