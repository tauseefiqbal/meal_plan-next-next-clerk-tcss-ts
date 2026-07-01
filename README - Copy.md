# 🥗 AI Meal Plan — Full Stack SaaS Web App

> A full‑stack AI‑powered SaaS application built with Next.js (frontend + backend) and TypeScript, featuring Clerk authentication, AI‑generated personalized 7‑day meal plans, and Stripe subscription billing. Users receive customized meal plans tailored to their dietary preferences, allergies, and calorie goals. The platform includes  Stripe webhook automation for subscription lifecycle events such as payment success, renewal, cancellation, and failed payments.


---

## 📑 Table of Contents

- [🥗 AI Meal Plan — Full Stack SaaS Web App](#-ai-meal-plan--full-stack-saas-web-app)
  - [📑 Table of Contents](#-table-of-contents)
  - [✅ Features](#-features)
  - [🛠 Tech Stack](#-tech-stack)
  - [🚀 Deployment](#-deployment)
  - [🔐 Test and Admin User Access](#-test-and-admin-user-access)
    - [Admin Access](#admin-access)
  - [👤 How To Use App For Regular User](#-how-to-use-app-for-regular-user)
    - [Step 1: Create an Account](#step-1-create-an-account)
    - [Step 2: Login to System](#step-2-login-to-system)
    - [Step 3: Choose a Subscription Plan](#step-3-choose-a-subscription-plan)
    - [Step 4: Generate Your Customized Meal Plan](#step-4-generate-your-customized-meal-plan)
    - [Step 5: View Your Current Plan](#step-5-view-your-current-plan)
    - [Step 6: Update Your Plan](#step-6-update-your-plan)
    - [Step 7: Cancel Your Plan](#step-7-cancel-your-plan)
  - [🛡 How To Use App For Admin User](#-how-to-use-app-for-admin-user)
    - [Managing Users via Clerk Dashboard](#managing-users-via-clerk-dashboard)
    - [Managing Subscriptions via Stripe Dashboard](#managing-subscriptions-via-stripe-dashboard)
  - [📁 Project Structure](#-project-structure)
  - [💻 Installation \& Local Development](#-installation--local-development)
    - [Prerequisites](#prerequisites)
    - [Setup Steps](#setup-steps)
    - [Environment Variables](#environment-variables)
  - [📡 API Routes Reference](#-api-routes-reference)
  - [🤝 Contributing](#-contributing)
  - [📄 License](#-license)

---

## ✅ Features

- ✅ **AI-Powered Meal Plans** — Generate personalised 7-day meal plans using OpenAI GPT-4o Mini based on diet type, calorie goals, allergies, cuisine preference, and snack inclusion
- ✅ **User Authentication** — Secure sign-up, sign-in, and profile management powered by Clerk
- ✅ **Subscription Payments** — Weekly, monthly, and yearly subscription plans with Stripe Checkout
- ✅ **Subscription Management** — Users can upgrade, downgrade, or cancel their plan directly from the profile page
- ✅ **Protected Routes** — Middleware-level route protection using Clerk; unauthenticated users are redirected to sign-up
- ✅ **Subscription Gating** — Non-subscribed users are automatically redirected to the subscribe page when accessing the meal plan dashboard
- ✅ **Stripe Webhooks** — Real-time subscription lifecycle handling (activation, payment failure, cancellation)
- ✅ **User Profile Dashboard** — View account details, current plan, and manage subscription
- ✅ **Interactive Meal Calendar** — Weekly meal plan displayed on a visual calendar for easy navigation
- ✅ **Responsive UI** — Clean, mobile-first design built with TailwindCSS
- ✅ **MongoDB Database** — User profile and subscription data persisted via Prisma ORM
- ✅ **Type-Safe Codebase** — Fully typed with TypeScript throughout the frontend and backend
- ✅ **Serverless Architecture** — Deployed as a single Next.js app on Vercel with serverless API routes

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) |
| **Authentication** | [Clerk](https://clerk.com/) |
| **Payments** | [Stripe](https://stripe.com/) |
| **AI / LLM** | [OpenAI GPT-4o Mini](https://openai.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) (via Atlas) |
| **ORM** | [Prisma](https://www.prisma.io/) |
| **Data Fetching** | [TanStack React Query v5](https://tanstack.com/query) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## 🚀 Deployment

The application is deployed as a single unified Next.js project (frontend + backend API routes) on Vercel.

**🌐 Live App URL:** [https://meal-plan-next-next-clerk-tcss-ts.vercel.app/](https://meal-plan-next-next-clerk-tcss-ts.vercel.app/)

> **Note:** Use the Stripe test card `4242 4242 4242 4242` (any future expiry, any CVC) to test payments without real charges.

---

## 🔐 Test and Admin User Access

This application uses **Clerk Authentication**.
To access the application:
1. Click **Sign In** in the top navigation bar and sign in using your **Google**, **GitHub**, or **Apple** account.
2. Alternatively, click **Sign Up** in the top navigation bar.
3. Create a new account using your own email address.
4. Enter the verification code sent to your email.
5. After successfully signing up, you will be automatically signed in and redirected to the application.
> **Note:** No preconfigured test or demo account is provided because Clerk requires email verification for new users.

### Admin Access

This project does **not** include a separate admin interface. Administrative tasks are managed through the external dashboards below.
| Dashboard            | URL                                                          |
| :------------------- | :----------------------------------------------------------- |
| **Clerk Dashboard**  | [https://dashboard.clerk.com](https://dashboard.clerk.com)   |
| **Stripe Dashboard** | [https://dashboard.stripe.com](https://dashboard.stripe.com) |
> **Note:** Administrator access to the Clerk and Stripe dashboards is restricted to the project owner. If you require administrative access, please contact the project owner.

---

## 👤 How To Use App For Regular User

### Step 1: Create an Account

1. Visit the app at [https://meal-plan-next-next-clerk-tcss-ts.vercel.app/](https://meal-plan-next-next-clerk-tcss-ts.vercel.app/)
2. Click **Sign Up** in the top navigation bar
3. Register with your email address and a password
4. Your user profile is automatically created in the database on first sign-in

### Step 2: Login to System

1. Visit the app at [https://meal-plan-next-next-clerk-tcss-ts.vercel.app/](https://meal-plan-next-next-clerk-tcss-ts.vercel.app/)
2. Click **Sign In** in the top navigation bar
3. Enter the credential you registered earlier, or sign in using your **Google**, **GitHub**, or **Apple** account by clicking the appropriate icon.

### Step 3: Choose a Subscription Plan

1. Click **Mealplan** in the top navigation bar. If you didn’t subscribe to any Weekly, Monthly, or Yearly plan, the **Subscribe** option will appear; otherwise, the **Generate Your Customized Meal Plan** option will appear.
2. Choose from one of three plans:
   - **Weekly Plan** — $9.99/week — Great for trying the service
   - **Monthly Plan** — $39.99/month — Best for ongoing meal planning *(Most Popular)*
   - **Yearly Plan** — $299.99/year — Best value for long-term users
3. Click **Subscribe** on your chosen plan
4. You will be redirected to Stripe Checkout — enter your payment details
   - For testing, use Stripe test card number: `4242 4242 4242 4242` and for expiry, enter any future date and enter any CVC.
5. After successful payment, you are redirected back to the app with your subscription activated

### Step 4: Generate Your Customized Meal Plan

1. Click **Mealplan** in the top navigation bar. If you didn’t subscribe to any Weekly, Monthly, or Yearly plan, the **Subscribe** option will appear; otherwise, the **Generate Your Customized Meal Plan** option will appear.
2. Fill in the meal plan form:
   - **Diet Type** — e.g., Vegetarian, Keto, Mediterranean
   - **Daily Calorie Goal** — between 500 and 5,000 calories
   - **Allergies or Restrictions** — e.g., Nuts, Dairy, or leave blank
   - **Preferred Cuisine** — e.g., Italian, Asian, or leave blank
   - **Include Snacks** — toggle to include snack suggestions
3. Click **Generate Meal Plan**
4. Your personalised 7-day meal plan will appear in the calendar view
5. Click any day on the calendar to view that day's meals (Breakfast, Lunch, Dinner, Snacks)

### Step 5: View Your Current Plan

1. If you are signed in, you will see the **Profile** option in the top navigation; click it.
2. You will see **Current Plan** heading, in which you will see your current subscription plan.

### Step 6: Update Your Plan

1. If you are signed in, you will see the **Profile** option in the top navigation; click it.
2. You will see **Change Subscription Plan** heading, select your desired plan from the list for change, and then click **Save** button.

### Step 7: Cancel Your Plan

1. If you are signed in, you will see the **Profile** option in the top navigation; click it.
2. You will see **Unsubscribe** heading in the end, under that heading click **Unsubscribe** button.

---

## 🛡 How To Use App For Admin User

Admin management is handled through external dashboards — no separate in-app admin panel exists.

### Managing Users via Clerk Dashboard

1. Log in to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Navigate to **Users** to view, search, or manage all registered users
3. You can:
   - View user profiles and email addresses
   - Ban or delete users
   - Impersonate users for debugging
   - View sign-in activity and sessions

### Managing Subscriptions via Stripe Dashboard

1. Log in to [https://dashboard.stripe.com](https://dashboard.stripe.com)
2. Navigate to **Customers** to view all customers and their subscriptions
3. Navigate to **Subscriptions** to:
   - View active, cancelled, and past-due subscriptions
   - Manually cancel or modify subscriptions
   - Issue refunds
4. Navigate to **Webhooks** to monitor webhook delivery and replay failed events
5. Navigate to **Products & Prices** to update or create subscription plan pricing

> **Webhook Events Handled:**
> - `checkout.session.completed` — Activates subscription in database
> - `invoice.payment_failed` — Deactivates subscription on failed payment
> - `customer.subscription.deleted` — Deactivates subscription on cancellation

---

## 📁 Project Structure

```
├── app/
│   ├── api/
│   │   ├── check-subscription/      # Subscription check (used by middleware)
│   │   ├── checkout/                # Stripe Checkout session creation
│   │   ├── create-profile/          # Auto-create user profile on sign-in
│   │   ├── generate-mealplan/       # OpenAI meal plan generation
│   │   ├── profile/
│   │   │   ├── change-plan/         # Upgrade/downgrade subscription
│   │   │   ├── subscription-status/ # Fetch current subscription
│   │   │   └── unsubscribe/         # Cancel subscription
│   │   └── stripe-webhook/          # Stripe webhook handler
│   ├── mealplan/                    # Protected meal plan dashboard
│   ├── profile/                     # Protected user profile page
│   ├── sign-in/                     # Clerk sign-in page
│   ├── sign-up/                     # Clerk sign-up page
│   ├── subscribe/                   # Subscription plans page
│   ├── layout.tsx                   # Root layout with Clerk + React Query
│   └── page.tsx                     # Public landing/home page
├── components/
│   ├── create-profile.tsx           # Auto-profile creation component
│   ├── meal-plan-dashboard.tsx      # Meal plan form + calendar display
│   ├── navbar.tsx                   # Navigation bar
│   ├── react-query-client-provider.tsx
│   └── spinner.tsx                  # Loading spinner
├── lib/
│   ├── constants.ts                 # App-wide constants
│   ├── env.ts                       # Environment variable validation
│   ├── plans.ts                     # Subscription plan definitions
│   ├── prisma.ts                    # Prisma client singleton
│   ├── rate-limit.ts                # Rate limiting configuration
│   └── stripe.ts                    # Stripe client
├── prisma/
│   └── schema.prisma                # Database schema (MongoDB)
├── middleware.ts                    # Clerk auth + subscription middleware
└── next.config.ts                   # Next.js configuration
```

---

## 💻 Installation & Local Development

### Prerequisites

- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) database (free tier works)
- A [Clerk](https://clerk.com) account
- A [Stripe](https://stripe.com) account
- An [OpenAI](https://platform.openai.com) API key
- [Stripe CLI](https://stripe.com/docs/stripe-cli) (for local webhook testing)

### Setup Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/tauseefiqbal/meal_plan-next-next-clerk-tcss-ts.git 
   cd meal_plan-next-next-clerk-tcss-ts
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Fill in all values in `.env.local` (see [Environment Variables](#environment-variables) below).

4. **Push the Prisma schema to your database:**
   ```bash
   npx prisma db push
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

6. **Start Stripe webhook listener** (in a separate terminal):
   ```bash
   npm run stripe:listen
   ```

7. Visit [http://localhost:3000](http://localhost:3000)

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Database (MongoDB)
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Stripe
STRIPE_SECRET_KEY=sk_test_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Stripe Price IDs (from your Stripe Dashboard > Products)
STRIPE_PRICE_WEEKLY=price_xxxxx
STRIPE_PRICE_MONTHLY=price_xxxxx
STRIPE_PRICE_YEARLY=price_xxxxx

# OpenAI
OPENAI_API_KEY=sk-xxxxx

# App Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

---

## 📡 API Routes Reference

| Method | Route | Auth Required | Description |
|---|---|---|---|
| `POST` | `/api/create-profile` | ✅ Clerk | Creates user profile on first sign-in |
| `GET` | `/api/check-subscription` | ❌ Public | Checks if a userId has an active subscription |
| `POST` | `/api/checkout` | ❌ Public | Creates a Stripe Checkout session |
| `POST` | `/api/stripe-webhook` | ❌ Public (Stripe signature verified) | Handles Stripe webhook events |
| `POST` | `/api/generate-mealplan` | ✅ Clerk | Generates a 7-day meal plan via OpenAI |
| `GET` | `/api/profile/subscription-status` | ✅ Clerk | Returns the current user's subscription |
| `POST` | `/api/profile/change-plan` | ✅ Clerk | Upgrades or downgrades subscription plan |
| `POST` | `/api/profile/unsubscribe` | ✅ Clerk | Cancels subscription at period end |

---

## 🤝 Contributing

Contributions are welcome! Please fork the repository, create a feature branch, and submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

<p align="center">Built with ❤️ using Next.js, Clerk, Stripe & OpenAI</p>
