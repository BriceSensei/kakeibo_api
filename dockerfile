FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

USER node

EXPOSE 3306
EXPOSE 3000

CMD ["npm", "run", "start:prod"]
# ```