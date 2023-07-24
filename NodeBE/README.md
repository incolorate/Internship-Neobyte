## Installation

**Note: when using git clone be mindfull of the branch**

```bash
$ git clone gh repo clone incolorate/Internship-Neobyte
$ cd NodeBE
$ npm install
$ npm i bcrypt
```

**Make sure to have a redis-server opened, you can find a guide here (https://redis.io/docs/getting-started/)[https://redis.io/docs/getting-started/]**

Rename .env.example to .env and provide a MONGODB connection URI

If you are using a new db don't forget to [Prototype your schema](https://www.prisma.io/docs/concepts/components/prisma-migrate/db-push)

```
MONGODB = "mongodb uri"
SECRET = "express session secret code"
```

```bash
$ npm run dev
```
