# BUILD FOR LOCAL DEVELOPMENT
FROM node:18-bullseye-slim As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci --legacy-peer-deps

COPY --chown=node:node . .

USER node

# BUILD FOR PRODUCTION
FROM node:18-bullseye-slim As build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm pkg delete scripts.prepare
RUN npm ci --only=production --legacy-peer-deps && npm cache clean --force

USER node

# PRODUCTION
FROM node:18-bullseye-slim As production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/static ./static
RUN mkdir ./pdfs

CMD [ "dist/main.js" ]
