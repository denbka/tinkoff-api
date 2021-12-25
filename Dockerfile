FROM node:13.4-alpine

# Рабочая директория в контейнере
WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install

COPY . .

COPY ./dist ./dist

CMD ["npm", "run", "start:dev"]
