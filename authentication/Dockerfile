FROM node:alpine

WORKDIR /authentication

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 2000

CMD nodemon -L --watch . index.js