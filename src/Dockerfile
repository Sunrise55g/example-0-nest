FROM node:22

WORKDIR /app

COPY package*.json ./

RUN npm install -g --update npm
RUN npm install --update npm
RUN npm install

COPY . .

RUN npm run build

# CMD [ "npm", "run", "start:debug" ]
