Express Typescript Rest API Starter
===
- Simple project starter point for Rest API using Nodejs & Expressjs.
- Starter point for learning and practice Rest API with Typescript, Nodejs & Expressjs.
- Inspired by [TypeScript-Node-Starter](https://github.com/Microsoft/TypeScript-Node-Starter), [express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api).
- ES6 Version: https://github.com/ngmikeng/mn-express-rest-starter.

### Dependencies
- Authentication: `jsonwebtoken`, `express-jwt`.
- Validation: `express-validation`, `joi`.
- Log: `winston`.
- ODM: `mongoose`.
- Promise: `bluebird`.
- Unit test: `mocha`, `supertest`.
- Others: `dotenv`, `cors`, `helmet`...

### API Info
- Swagger API docs: http://localhost:5000/api/v1/api-docs/
- Swagger setup using: `swagger-ui-express` and `swagger-jsdoc`.

### Get started
- Typescript >= 2.7.
- Install packages npm
```shell
$ npm install 
```
- Add file `.env`
```shell
$ cp .env.sample .env
```
- Build and run
```shell
$ npm run start
```
- Watch files & auto build
```shell
$ npm run watch
```

### TODO
- Handle mongo validation error, index error.
- ORM: SequelizeJS.
- Write definitely type for some libraries which don't have.
- Testing more.

### License
MIT
