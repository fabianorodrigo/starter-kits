import {expect} from "chai";
import request from "supertest";

import app from "../../../app";

export default function () {
  it("# should respond with a 200 status code and all data when asking with no filter", async () => {
    const response = await request(app).post("/person/search");
    expect(response.body.message).to.be.undefined;
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.be.an("array").with.length.greaterThanOrEqual(3);
  });
  it("# should respond with a 200 status code and all data when asking with no filter", async () => {
    const response = await request(app)
      .post("/person/search")
      .send({filter: {attribute: "age", value: 57}});
    expect(response.body.message).to.be.undefined;
    expect(response.statusCode).to.eql(200);
    expect(response.body).to.be.an("array").with.length(1);
    expect(response.body[0].id).to.eql(4);
    expect(response.body[0].name).to.eql("João Nascimento");
    expect(response.body[0].age).to.eql(57);
    expect(response.body[0].url).to.be.undefined;
  });
}
