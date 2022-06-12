import request from "supertest";
import chai, {expect} from "chai";

import app from "../../../app";
import {generateRandomString} from "../../utils";

const INEXISTENT_ID =
  "99999999999999999999999999999999999999999999999999999999";

export default function () {
  it("should respond with a 201 status code and the person data including ID", async () => {
    const newPerson = {
      name: generateRandomString(Math.floor(Math.random() * 20)),
      age: Math.floor(Math.random() * 100),
    };
    const response = await request(app).post("/person").send(newPerson);
    expect(response.body.message).to.be.undefined;
    expect(response.statusCode).to.eql(201, response.body.message);
    expect(response.body.id).to.be.not.null;
    expect(response.body.id).to.be.not.undefined;
    expect(response.body.name).to.eql(newPerson.name);
    expect(response.body.age).to.eql(newPerson.age);
  });
  it("should respond with a 400 status code when includes unrecognized attributes", async () => {
    const newPerson = {
      name: generateRandomString(Math.floor(Math.random() * 20)),
      age: Math.floor(Math.random() * 100),
      teste: "xpto",
    };
    const response = await request(app).post("/person").send(newPerson);
    expect(response.statusCode).to.eql(400);
    expect(response.body.message).to.eql(
      "'teste' is not a recognized attribute for Person"
    );
  });
  it("should respond with a 400 status code when does not include required attributes", async () => {
    const newPerson = {
      age: Math.floor(Math.random() * 100),
      url: "http://www.teste.com",
    };
    const response = await request(app).post("/person").send(newPerson);
    expect(response.statusCode).to.eql(400);
    expect(response.body.message).to.eql("Person name is required");
  });
}
