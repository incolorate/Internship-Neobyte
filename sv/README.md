## Installation

**Note: when using git clone be mindfull of the branch**
```bash
$ git clone gh repo clone incolorate/Internship-Neobyte 
$ cd NodeBE
$ npm install
$ npm i bcrypt
```
**Make sure to have a redis-server opened, you can find a guide here (https://redis.io/docs/getting-started/)[https://redis.io/docs/getting-started/]**

Rename  .env.example to .env and provide a MONGODB connection URI


```
MONGODB = "mongodb uri"
SECRET = "express session secret code"
```

```bash
$ npm run dev
```
