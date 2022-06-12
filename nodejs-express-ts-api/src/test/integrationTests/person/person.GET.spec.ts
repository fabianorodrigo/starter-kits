import request from "supertest";
import chai, {expect} from "chai";

import app from "../../../app";
import {generateRandomString} from "../../utils";

const INEXISTENT_ID =
  "99999999999999999999999999999999999999999999999999999999";

export default function () {
  it("# should respond with a 200 status code and the person's data when asking for a valid ID", async () => {
    const response = await request(app).get("/person/1");
    expect(response.body.message).to.be.undefined;
    expect(response.statusCode).to.eql(200);
    expect(response.body.id).to.eql(1);
    expect(response.body.name).to.eql("Kassius Nascimento");
    expect(response.body.age).to.eql(37);
    expect(response.body.url).to.eql("https://github.com/katisoca");
  });
  it("# should respond with a 404 status code when asking for an inexistent ID", async () => {
    const response = await request(app).get(`/person/${INEXISTENT_ID}`);
    expect(response.statusCode).to.eql(404);
    expect(response.body.message).to.eql("Person not found");
  });
  it("# should respond with a 404 status code when asking for an invalid ID", async () => {
    const response = await request(app).get("/person/ZZZ");
    expect(response.statusCode).to.eql(404);
    expect(response.body.message).to.eql("Person not found");
  });
}
