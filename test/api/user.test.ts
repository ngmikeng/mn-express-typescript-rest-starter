import { expect } from "chai";
import httpStatus from "http-status";
import { default as supertest } from "supertest";
import config from "../../src/config/config";

const BASE_ROUTE = "/api/v1/users";
const request = supertest(config.rootUrl);
const validUserCredentials = {
  username: "typescript",
  password: "typescript"
};
let authToken: string;
type User = { _id: string, username: string, email: string, fullName: string };

before("Get auth token", (done) => {
  request
    .post("/api/v1/auth/login")
    .send(validUserCredentials)
    .expect(httpStatus.OK)
    .then((res) => {
      expect(res.body.data.token).is.not.empty;
      authToken = res.body.data.token;
      done();
    })
    .catch(done);
});

describe("## User API", () => {
  let userTest: User;
  const userReqBody = { username: "test", email: "testuser@gmail.com", fullName: "Test User" };

  describe(`GET ${BASE_ROUTE} - Get list of users`, () => {
    it("should return Unauthorized error", (done) => {
      request
        .get(`${BASE_ROUTE}/`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).equal("Unauthorized error");
          done();
        })
        .catch(done);
    });

    it("should return result list users as an array", (done) => {
      request
        .get(`${BASE_ROUTE}/`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.an("array");
          done();
        })
        .catch(done);
    });
  });

  describe(`POST ${BASE_ROUTE} - Create new user`, () => {
    it("should return Unauthorized error", (done) => {
      request
        .post(`${BASE_ROUTE}/`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).equal("Unauthorized error");
          done();
        })
        .catch(done);
    });

    it("should return validation error because the request body is invalid", (done) => {
      request
        .post(`${BASE_ROUTE}/`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ fullName: "NoUserName" })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).equal("validation error");
          done();
        })
        .catch(done);
    });

    it("should create user successful and result is an object", (done) => {
      request
        .post(`${BASE_ROUTE}/`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(userReqBody)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.an("object");
          expect(res.body.data._id).to.be.a("string");
          userTest = res.body.data;
          done();
        })
        .catch(done);
    });
  });

  describe(`GET ${BASE_ROUTE}/:userId - Get an user`, () => {
    it("should return Unauthorized error", (done) => {
      request
        .get(`${BASE_ROUTE}/${userTest._id}`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).equal("Unauthorized error");
          done();
        })
        .catch(done);
    });

    it("should return validation error because the param 'userId' is 'undefined'", (done) => {
      request
        .get(`${BASE_ROUTE}/undefined`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).equal("validation error");
          done();
        })
        .catch(done);
    });

    it("should get an user successful and result is an object", (done) => {
      request
        .get(`${BASE_ROUTE}/${userTest._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.an("object");
          expect(res.body.data._id).to.be.a("string");
          done();
        })
        .catch(done);
    });
  });

  describe(`POST ${BASE_ROUTE}/db - Create new user in a specified database name`, () => {
    it("should return Unauthorized error", (done) => {
      request
        .post(`${BASE_ROUTE}/db`)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).equal("Unauthorized error");
          done();
        })
        .catch(done);
    });

    it("should return validation error because the request query 'db' is empty", (done) => {
      request
        .post(`${BASE_ROUTE}/db`)
        .query({ db: "" })
        .set("Authorization", `Bearer ${authToken}`)
        .send({ fullName: "NoUserName" })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).equal("validation error");
          done();
        })
        .catch(done);
    });

    it("should return validation error because the request body is invalid", (done) => {
      request
        .post(`${BASE_ROUTE}/db`)
        .query({ db: "mn-express-rest-stater-specified" })
        .set("Authorization", `Bearer ${authToken}`)
        .send({ fullName: "NoUserName" })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).equal("validation error");
          done();
        })
        .catch(done);
    });

    it("should create user successful and result is an object", (done) => {
      request
        .post(`${BASE_ROUTE}/db`)
        .query({ db: "mn-express-rest-stater-specified" })
        .set("Authorization", `Bearer ${authToken}`)
        .send(userReqBody)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data).to.be.an("object");
          expect(res.body.data._id).to.be.a("string");
          userTest = res.body.data;
          done();
        })
        .catch(done);
    });
  });
});