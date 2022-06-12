import {expect} from "chai";
import request from "supertest";

import app from "../../../app";
import {generateRandomString} from "../../utils";

export default function () {
  it("should respond with a 200 status code and the person data updated", async () => {
    const newData = {
      id: 0,
      name: generateRandomString(Math.floor(Math.random() * 20)),
      age: Math.floor(Math.random() * 100),
    };
    const allRegistries = await request(app).post("/person/search");
    const ID = allRegistries.body[allRegistries.body.length - 1].id;
    newData.id = ID;
    const response = await request(app).put("/person").send(newData);
    expect(response.body.message).to.be.undefined;
    expect(response.statusCode).to.eql(200, response.body.message);
    expect(response.body.id).to.eql(ID);
    expect(response.body.name).to.eql(newData.name);
    expect(response.body.age).to.eql(newData.age);
  });
  it("should respond with a 400 status code when includes unrecognized attributes", async () => {
    const newData = {
      id: 0,
      name: generateRandomString(Math.floor(Math.random() * 20)),
      age: 18,
      teste: Math.floor(Math.random() * 100),
    };
    const allRegistries = await request(app).post("/person/search");
    const ID = allRegistries.body[allRegistries.body.length - 1].id;
    newData.id = ID;
    const response = await request(app).put("/person").send(newData);
    expect(response.statusCode).to.eql(400);
    expect(response.body.message).to.eql(
      "'teste' is not a recognized attribute for Person"
    );
  });
  it("should respond with a 400 status code when does not include required attributes", async () => {
    const newData = {
      id: 0,
      name: generateRandomString(Math.floor(Math.random() * 20)),
    };
    const allRegistries = await request(app).post("/person/search");
    const ID = allRegistries.body[allRegistries.body.length - 1].id;
    newData.id = ID;
    const response = await request(app).put("/person").send(newData);
    expect(response.statusCode).to.eql(400);
    expect(response.body.message).to.eql("Person age is required");
  });
}
