FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

# Installer toutes les dépendances, y compris devDependencies
RUN npm install --production=false

COPY . .

RUN npm run build

USER node

EXPOSE 3306
EXPOSE 8080

CMD ["npm", "run", "start:prod"]
