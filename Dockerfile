FROM node:20-alpine AS development

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]