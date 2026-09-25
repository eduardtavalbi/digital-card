FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

ENV DATABASE_URL="postgresql://postgres:postgres@postgres:5432/digital_card?schema=public"

RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run db:migrate && npm run db:seed && npm run start:prod"]