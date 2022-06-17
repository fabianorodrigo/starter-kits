import {expect} from "chai";
import request from "supertest";

import app from "../../../app";

const INEXISTENT_ID =
  "99999999999999999999999999999999999999999999999999999999";

export default function () {
  const superTest = request(app);

  describe("Authenticated requests", () => {
    let JWTtoken: string;
    beforeEach(async () => {
      const response = await superTest.post("/user/").send({
        username: "fabianorodrigo",
        password: "123456",
      });
      JWTtoken = response.headers["authorization"];
      expect(response.statusCode).to.eql(200);
    });

    it.only("should respond with a 200 status code", async () => {
      const allRegistries = await await superTest
        .post("/person/search")
        .set("authorization", JWTtoken);
      const ID = allRegistries.body[allRegistries.body.length - 1].id;
      const response = await superTest.delete(`/person/${ID}`);
      expect(response.body.message).to.be.undefined;
      expect(response.statusCode).to.eql(200, response.body.message);
    });
    it("should respond with a 404 status code when not informing a ID", async () => {
      const response = await request(app).delete(`/person/`);
      //a rota "DELETE /person" não existe
      expect(response.statusCode).to.eql(404, response.body.message);
    });
    it("should respond with a 404 status code when deleting an inexistent ID", async () => {
      const response = await request(app).delete(`/person/${INEXISTENT_ID}`);
      expect(response.statusCode).to.eql(404);
    });
    it("should respond with a 404 status code when deleting an invalid ID", async () => {
      const response = await request(app).delete(`/person/ZZZ`);
      expect(response.statusCode).to.eql(404);
    });
  });
}
