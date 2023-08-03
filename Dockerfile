FROM node:alpine
ADD . /app
RUN mkdir -p /app/node_modules && chown -R node:node /app
WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

# COPY
COPY . .

RUN npm install -g npm@9.8.1

RUN npm install

RUN npx prisma generate

EXPOSE 4000

CMD ["npm", "run", "start"]