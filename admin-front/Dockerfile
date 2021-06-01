FROM node:13-alpine

WORKDIR /admin-front

COPY package.json .

RUN npm install --silent

RUN npm install react-scripts@3.3.1 -g --silent

COPY . . 

EXPOSE 12000

CMD ["npm", "start"]
