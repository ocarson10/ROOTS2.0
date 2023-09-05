FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY .env ./
RUN npm i
COPY ./ ./

CMD ["node", "index.js"]