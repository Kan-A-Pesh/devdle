FROM node:20-alpine AS base

WORKDIR /data
COPY package.json package-lock.json /data/
ENV PATH=/data/node_modules/.bin:$PATH

# Development stage
FROM base AS development

ENV NODE_ENV=development
RUN npm install --include=dev

USER node
WORKDIR /data/app

CMD ["vite"]

# Production stage
FROM base AS build

ENV NODE_ENV=production
RUN npm install

COPY . /data/app
WORKDIR /data/app

RUN npm run build

FROM nginx:alpine AS production

COPY --from=build /data/app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
