import request from "supertest";
import chai, {expect} from "chai";

import app from "../../../app";
import {generateRandomString} from "../../utils";

const INEXISTENT_ID =
  "99999999999999999999999999999999999999999999999999999999";

export default function () {
  it("should respond with a 200 status code", async () => {
    const allRegistries = await request(app).post("/person/search");
    const ID = allRegistries.body[allRegistries.body.length - 1].id;
    const response = await request(app).delete(`/person/${ID}`);
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
}
