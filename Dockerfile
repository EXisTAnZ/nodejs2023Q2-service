FROM node:18-alpine as dev

WORKDIR /app

COPY package.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:18-alpine as prod

WORKDIR /app

COPY package.json ./

RUN npm install --only=production

COPY . . 

COPY --from=dev /app/dist ./dist

COPY . .

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start:prod"]