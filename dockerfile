FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

USER node

EXPOSE 3306
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
# ```