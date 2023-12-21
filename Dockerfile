# Use the official Node.js image
FROM node:latest AS base

# Install MySQL client and server
RUN apt-get update && apt-get install -y mariadb-client mariadb-server

# Set the MySQL root password (change it as needed)
ENV MYSQL_ROOT_PASSWORD=root_password

# Create MySQL database and user
ENV MYSQL_DATABASE=ichoosesv
ENV MYSQL_USER=ichoosesv
ENV MYSQL_PASSWORD=password

# Install dependencies only when needed
FROM base AS deps
RUN apt-get update && apt-get install -y libc6
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then rm -rf node_modules && npm install && npm ci; \
  elif [ -f pnpm-lock.yaml ]; then yarn global add pnpm && pnpm install; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Initialize MySQL database and user
RUN service mysql start \
  && mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE DATABASE $MYSQL_DATABASE;" \
  && mysql -u root -p$MYSQL_ROOT_PASSWORD -e "CREATE USER '$MYSQL_USER'@'%' IDENTIFIED BY '$MYSQL_PASSWORD';" \
  && mysql -u root -p$MYSQL_ROOT_PASSWORD -e "GRANT ALL PRIVILEGES ON $MYSQL_DATABASE.* TO '$MYSQL_USER'@'%';" \
  && mysql -u root -p$MYSQL_ROOT_PASSWORD -e "FLUSH PRIVILEGES;" \
  && service mysql stop

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npx prisma db push

RUN npm run build

# If using yarn, comment out the line above and use the one below instead
# RUN yarn build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN groupadd --system --gid 1001 nodejs
RUN useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for the prerender cache
RUN mkdir .next
RUN chown -R nextjs:nodejs .next
RUN chown -R nextjs:nodejs public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# Set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
