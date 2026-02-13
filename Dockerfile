FROM node:20-alpine AS development

RUN apk add --no-cache bash

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]