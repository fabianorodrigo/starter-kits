// This is the root test file that will import all my test suites

import dotenv from "dotenv";
// load environment variables from .env file
dotenv.config();

import {Suite} from "mocha";
import sinon from "sinon";
import {RedisService} from "./../services/redis.service";

import getUserDataSpec from "../services/github.service.spec";
import personDELETESpec from "./integrationTests/person/person.DELETE.spec";
import personGETSpec from "./integrationTests/person/person.GET.spec";
import personPOSTSearchSpec from "./integrationTests/person/person.POST.search.spec";
import personPOSTSpec from "./integrationTests/person/person.POST.spec";
import personPUTSpec from "./integrationTests/person/person.PUT.spec";
import {RedisServiceStub} from "./stubs";
import {initAuthBearerStrategy, initAuthLocalStrategy} from "../auth";

describe("Unit testing", function (this: Suite) {
  describe("getUserData", getUserDataSpec);
});

describe("Integration testing", async function (this: Suite) {
  sinon.stub(RedisService, "getInstance").callsFake(() => {
    return new RedisServiceStub() as unknown as RedisService;
  });

  // Essa chamada já existe no arquivo app.ts, mas não está rolando
  // durante os testes. A inclusão aqui também não surtiu efeito:
  // sempre chama o middleware sem passar antes pela Verification
  // Callback da estratégia Bearer
  //
  // TODO: O passaport-bearer e o Supertest não estão se entendendo
  //
  // await initAuthBearerStrategy();

  describe("Person", () => {
    describe("GET /person", personGETSpec);
    describe("POST /person/search", personPOSTSearchSpec);
    describe("POST /person", personPOSTSpec);
    describe("PUT /person", personPUTSpec);
    describe("DELETE /person", personDELETESpec);
  });
});
