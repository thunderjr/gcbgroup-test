FROM node:alpine

WORKDIR /usr/app

COPY package*.json .

COPY . .

RUN yarn

EXPOSE 3000

ENV NODE_ENV=docker

CMD ["yarn", "start:dev"]