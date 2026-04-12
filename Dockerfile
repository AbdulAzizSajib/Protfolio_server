FROM node:22-slim AS builder

WORKDIR /app

# Install dependencies with pnpm lockfile for reproducible builds
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# Copy the full project for runtime
COPY . .
RUN pnpm exec prisma generate

FROM node:22-slim AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy app source and installed dependencies
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/prisma ./prisma

# Your app reads PORT from env; default can be overridden at runtime
ENV PORT=5000
EXPOSE 5000

CMD ["./node_modules/.bin/tsx", "src/app/server.ts"]
