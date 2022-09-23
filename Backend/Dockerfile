FROM node:16-alpine

WORKDIR /app_server

COPY . .

RUN npm install

EXPOSE 3001

ENTRYPOINT [ "node", "index.js" ]