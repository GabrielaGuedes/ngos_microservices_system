FROM node:alpine

WORKDIR /settings

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 11000

CMD nodemon -L --watch . index.js