FROM node:8.16.0-alpine

WORKDIR /app
COPY . /app
EXPOSE 3000

RUN npm install
CMD ["npm", "start"]