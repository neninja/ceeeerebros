FROM node:16-alpine

ENV NODE_ENV development

COPY . /app

WORKDIR /app

RUN yarn install
