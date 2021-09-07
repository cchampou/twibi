FROM node:16

COPY package.json package.json
COPY yarn.lock yarn.lock

RUN yarn

COPY . .

RUN yarn build

CMD yarn start