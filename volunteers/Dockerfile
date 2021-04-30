FROM node:alpine

WORKDIR /volunteers

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 5000

ENTRYPOINT [ "./init.sh" ]
