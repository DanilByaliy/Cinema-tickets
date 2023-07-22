FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm install cache-manager --legacy-peer-deps
RUN npm install sharp --legacy-peer-deps
COPY . .
RUN npm run build
CMD [ "npm", "start" ]
