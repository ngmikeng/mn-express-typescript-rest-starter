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

  describe("GET /api/v1/users - Get list of users", () => {
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

  describe("POST /api/users - Create new user", () => {
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

    it("should return validation error", (done) => {
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
        .send({ username: "test", email: "testuser@gmail.com", fullName: "Test User" })
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

  describe("GET /api/users/:userId - Get an user", () => {
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

    it("should return validation error", (done) => {
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
});