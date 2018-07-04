import { expect } from "chai";
import httpStatus from "http-status";
import { default as supertest } from "supertest";
import config from "../../src/config/config";

const BASE_ROUTE = "/api/v1/";
const request = supertest(config.rootUrl);

describe("## Misc / Index", () => {
  describe(`# GET ${BASE_ROUTE}/health-check`, () => {
    it("should return OK", (done) => {
      request
        .get(`${BASE_ROUTE}/health-check`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.text).to.equal("OK");
          done();
        })
        .catch(done);
    });
  });

  describe(`# GET ${BASE_ROUTE}/not-found-route`, () => {
    it("should return 404 status", (done) => {
      request
        .get(`${BASE_ROUTE}/not-found-route`)
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal("API not found");
          done();
        })
        .catch(done);
    });
  });
});
