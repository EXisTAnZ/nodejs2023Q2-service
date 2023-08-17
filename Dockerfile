FROM node:alpine as dev

WORKDIR /app

COPY prisma package*.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

FROM node:alpine as prod

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}}

WORKDIR /app

COPY --from=dev /app .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]