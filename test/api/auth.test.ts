import { default as chai, expect } from "chai";
import httpStatus from "http-status";
import { default as supertest } from "supertest";
import jwt from "jsonwebtoken";
import config from "../../src/config/config";

const request = supertest("http://localhost:5858");

describe("## Auth API", () => {
  const validUserCredentials = {
    username: "typescript",
    password: "typescript"
  };
  const invalidUserCredentials = {
    username: "typescript",
    password: "wrongPass"
  };
  
  describe("# POST /api/v1/login", () => {
    it("should return Authentication error", (done) => {
      request
        .post("/api/v1/auth/login")
        .send(invalidUserCredentials)
        .expect(httpStatus.UNAUTHORIZED)
        .then((res) => {
          expect(res.body.message).to.equal("Authentication error");
          done();
        })
        .catch(done);
    });

    it("should return Bad Request error", (done) => {
      request
        .post("/api/v1/auth/login")
        .send({ username: "", password: "" })
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.equal("validation error");
          done();
        })
        .catch(done);
    });

    it("should return valid JWT token", (done) => {
      request
        .post("/api/v1/auth/login")
        .send(validUserCredentials)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.data.token).is.not.empty;
          jwt.verify(res.body.data.token, config.jwtSecret, (err: Error, decoded: { username: string }) => {
            expect(err).is.null;
            expect(decoded.username).to.equal(validUserCredentials.username);
            done();
          });
        })
        .catch(done);
    });
  });
});