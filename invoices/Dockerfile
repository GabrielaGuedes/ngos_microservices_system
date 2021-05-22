FROM node:alpine

WORKDIR /invoices

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 10000

CMD nodemon -L --watch . index.js