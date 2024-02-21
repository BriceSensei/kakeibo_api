FROM node:20 AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install

COPY . .

RUN npx run build

# as build step❓

FROM node:20

# Set the working directory to /app
WORKDIR /app

# Copy node_modules from the builder stage
COPY --from=builder /app/node_modules ./node_modules

# Copy package.json and package-lock.json from the builder stage
COPY --from=builder /app/package*.json ./

# Copy the built application from the builder stage
# COPY --from=builder /app/dist ./dist


EXPOSE 3306
# or during execution ❓
CMD [ "npm", "run", "start:prod" ]
