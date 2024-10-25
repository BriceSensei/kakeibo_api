FROM node:18-alpine

WORKDIR /app

COPY . .
COPY nginx/nginx.conf /etc/nginx/nginx.conf

RUN npm ci

RUN npm run build

USER node

EXPOSE 3306
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
# ```