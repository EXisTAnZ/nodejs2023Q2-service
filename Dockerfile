FROM node:18-alpine as dev

WORKDIR /app

COPY package-dev.json ./package.json

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as prod

WORKDIR /app

COPY package.json ./

RUN npm install --only=prod

COPY . . 

COPY --from=dev /app/dist ./dist

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start:prod"]