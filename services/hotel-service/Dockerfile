FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install && apk add --no-cache curl

COPY . .

EXPOSE 5005

CMD ["npm", "start"]