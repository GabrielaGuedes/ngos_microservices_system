FROM node:alpine

WORKDIR /financial-control

COPY package.json .

RUN npm install --quiet

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 7000

ENTRYPOINT [ "./init.sh" ]
