# Marketplace notifications with Knock

This example app uses [Next.js](https://nextjs.org), [Prisma](https://www.prisma.io), and [Knock](https://knock.app) to build a two-sided marketplace for adventurers and tour operators. This app was generated with [Cursor](https://cursor.sh) and [V0.dev](https://v0.dev/).

![Screenshot of the app](./images/home-page.png)

[✍️ Read the guide](https://knock.app/blog/marketplace-notifications-with-knock-and-nextjs)

[📹 Watch the video](https://youtu.be/6h_mIWgjJFU)

## Install Dependencies

First, install the dependencies:

```bash
npm install
```

## Environment Variables

To run this application, you'll need to set up the following environment variables in your `.env` file:

```bash
# Database URL for Prisma
DATABASE_URL="file:./dev.db"

# NextAuth secret key
AUTH_SECRET="your-secret-key"

# Knock.app Variables
KNOCK_SECRET_API_KEY="sk_test_xxxx"              # Your Knock secret API key
NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY="pk_test_xxxx"  # Your Knock public API key
NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID="channel_xxxx" # Your Knock feed channel ID
KNOCK_SIGNING_KEY="key_xxxx"                     # Your Knock signing key
```

You can obtain the Knock-related keys by:

1. Creating an account at [knock.app](https://knock.app)
2. Getting the [default feed channel ID](https://docs.knock.app/integrations/in-app/knock) from the dashboard 'Integrations' section
3. Getting your [API keys](https://docs.knock.app/developer-tools/api-keys) from the dashboard settings

## Database Setup

Before starting the development server, you'll need to set up and seed the database. This project uses SQLite, so you shouldn't need to install anything else to get it running. Running `seed` and `destroy` commands will also create and remove resources from Knock:

1. Initialize Prisma and create the database:

```bash
npx prisma generate
npx prisma db push
```

2. Seed the database with initial data:

```bash

npm run seed
```

To reset the database, you can run:

```bash

npm run destroy
```

## Generating Knock Workflows

All of the workflows for this project are stored in the `knock` directory. To push these workflows to Knock without recreating them, you can use [the Knock CLI](https://docs.knock.app/cli).
First, install the CLI:

```bash
npm install -g @knocklabs/cli
```

Next, generate a service token and [authenticate the CLI](https://docs.knock.app/cli#authentication).

Then, you can push the workflows to Knock:

```bash
cd knock
knock workflow push --all
```

This should first validate then push all the workflows in the `knock` directory to your Knock `development` environment.

## Getting Started

Next, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Using this example app
