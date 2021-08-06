# Twibi
[![CI](https://github.com/cchampou/twibi/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/cchampou/twibi/actions/workflows/main.yml)

Cross Twitch &amp; and social network system, with notifications, chatbots & more...

---

## Prerequisite

To run development environment of Twibi, you need:

- NodeJS >= 14
- Docker

First you need to create a local configuration. Use the file `.env.local`,
and fill it with your values.

Then you need to start a development database. Use
```shell
docker-compose up dev-database
```

Install `node_modules`
```shell
yarn install
# or
npm install
```

> 💡 I suggest using Yarn, this is what I use on a daily basis

Then, you need to start a build server, with watchers on.
```shell
yarn build -w
```

Finally, you can start a dev server with watchers on.
```shell
yarn start:dev
```

Happy coding 🎉