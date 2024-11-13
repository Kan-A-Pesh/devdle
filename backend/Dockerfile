FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json /app/

# Development stage
FROM base AS development

ENV NODE_ENV=development
RUN npm install --include=dev
RUN chown -R node /app/node_modules

USER node
WORKDIR /app

CMD ["npx", "ts-node-dev", "--respawn", "--rs", "-r", "tsconfig-paths/register", "app.ts"]

# Production stage
# Build the app
FROM base AS build

RUN npm install

COPY . /app
WORKDIR /app

RUN npx tsc

# Create the server image
FROM node:20-alpine AS production
ENV NODE_ENV=production

COPY --from=build /app/dist /build/dist
COPY --from=build /package.json /data/package-lock.json /build/

WORKDIR /build
RUN npm install --only=production

ENV LOG_FOLDER=/logs
RUN mkdir -p $LOG_FOLDER && chown -R node $LOG_FOLDER

USER node

ENTRYPOINT ["node", "/build/dist/app.js"]

