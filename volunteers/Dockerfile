FROM node:alpine

WORKDIR /volunteers

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

RUN npx sequelize db:migrate

COPY . . 

EXPOSE 5000

CMD nodemon -L --watch . index.js