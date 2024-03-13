# FROM node:20 AS builder

# # Create app directory
# WORKDIR /app

# COPY . .

# # Install app dependencies
# RUN npm install


# RUN npx run build

# # as build step❓

# FROM node:20

# # Set the working directory to /app
# WORKDIR /app


# EXPOSE 3306
# # or during execution ❓
# CMD [ "npm", "run", "start:prod" ]



FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

USER node

CMD ["npm", "run", "start:prod"]