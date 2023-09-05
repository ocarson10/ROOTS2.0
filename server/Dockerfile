FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY .env ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i

CMD ["node", "index.js"]