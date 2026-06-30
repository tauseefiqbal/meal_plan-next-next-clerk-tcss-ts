// Constants for the application

// OpenAI Configuration
export const OPENAI_CONFIG = {
  MODEL: "gpt-4o-mini",
  TEMPERATURE: 0.7,
  MAX_TOKENS: 1500,
  TIMEOUT_MS: 25000, // 25 seconds (safe for Vercel)
} as const;

// Input Validation Limits
export const VALIDATION_LIMITS = {
  DIET_TYPE_MAX_LENGTH: 100,
  ALLERGIES_MAX_LENGTH: 200,
  CUISINE_MAX_LENGTH: 100,
  MIN_CALORIES: 500,
  MAX_CALORIES: 5000,
} as const;

// Meal Plan Configuration
export const MEAL_PLAN = {
  DAYS_PER_WEEK: 7,
  DAYS_OF_WEEK: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ] as const,
} as const;

// Subscription Plan Types
export const PLAN_TYPES = {
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
} as const;

export const ALLOWED_PLAN_TYPES = Object.values(PLAN_TYPES);

// Error Codes
export const ERROR_CODES = {
  MISSING_REQUIRED_FIELDS: "MISSING_REQUIRED_FIELDS",
  INVALID_PLAN_TYPE: "INVALID_PLAN_TYPE",
  MISSING_PRICE_ID: "MISSING_PRICE_ID",
  UNAUTHORIZED: "UNAUTHORIZED",
  SUBSCRIPTION_NOT_FOUND: "SUBSCRIPTION_NOT_FOUND",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  INVALID_INPUT: "INVALID_INPUT",
  OPENAI_ERROR: "OPENAI_ERROR",
  DATABASE_ERROR: "DATABASE_ERROR",
  STRIPE_ERROR: "STRIPE_ERROR",
} as const;
