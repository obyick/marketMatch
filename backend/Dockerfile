# Dockerfile do Backend
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm","run","start","node", "index.js"]
