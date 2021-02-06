FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

# Install dependencies
RUN npm ci

# Bundle app source
COPY . .

# Build
RUN npm run build

EXPOSE 8080
CMD [ "npm", "start" ]