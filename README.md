# Digital Business Card Backend

Backend application for a digital business card built with NestJS, GraphQL, Prisma and PostgreSQL.

The GraphQL API provides information about the profile, skills, work experience and projects.

## Tech Stack

- TypeScript
- Node.js
- NestJS
- GraphQL
- Apollo
- Prisma ORM
- PostgreSQL
- Docker / Docker Compose
- Jest

## Architecture

The application is separated into several layers:

- `ProfileResolver` - GraphQL API layer
- `ProfileService` - application/business logic
- `PrismaService` - database access
- `ProfileModule` - profile feature module
- Prisma schema and migrations - database structure
- `prisma/seed.ts` - initial profile data

## Run with Docker

The easiest way to start the project is Docker Compose.

```bash
docker compose up --build
```

This command will:

1. Start PostgreSQL
2. Apply Prisma migrations
3. Seed the database
4. Start the NestJS application

The GraphQL endpoint will be available at:

```text
http://localhost:3000/graphql
```

An interactive GraphQL IDE is available at the same address.

## Example GraphQL Query

```graphql
query {
  profile {
    name
    description
    github
    linkedin

    skills {
      name
    }

    experience {
      company
      position
      startDate
      endDate
      achievements
    }

    projects {
      name
      description
      url
    }
  }
}
```

Example of a shorter query:

```graphql
query {
  profile {
    name
    description
    skills {
      name
    }
    experience {
      company
      position
    }
    projects {
      name
    }
  }
}
```

## Local Development

Create a `.env` file based on `.env.example`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/digital_card?schema=public"
```

Install dependencies:

```bash
npm install
```

Generate Prisma Client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npm run db:migrate
```

Seed the database:

```bash
npm run db:seed
```

Start the application:

```bash
npm run start:dev
```

## Quality Checks

Build the project:

```bash
npm run build
```

Run unit tests:

```bash
npm test
```

Run the linter:

```bash
npm run lint
```

## Database Initialization

The Docker startup process automatically runs:

```text
Prisma migrations -> Database seed -> NestJS application
```

This allows the application to start from a fresh PostgreSQL database without manual database setup.