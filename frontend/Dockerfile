FROM node:20-alpine AS base

WORKDIR /app
COPY package.json package-lock.json /app/

# Development stage
FROM base AS development

ENV NODE_ENV=development
RUN npm install --include=dev
RUN chown -R node:node /app/node_modules

USER node
WORKDIR /app

CMD ["npx", "vite", "--host", "0.0.0.0"]

# Production stage
FROM base AS build

ENV NODE_ENV=production
RUN npm install

COPY . /app
WORKDIR /app

RUN npm run build

FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
