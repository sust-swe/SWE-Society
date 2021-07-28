FROM node:15
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD node server.js
