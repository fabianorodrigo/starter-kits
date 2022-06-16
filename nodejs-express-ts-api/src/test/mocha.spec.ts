// This is the root test file that will import all my test suites

import {Suite} from "mocha";
import getUserDataSpec from "../services/github.service.spec";
import personDELETESpec from "./integrationTests/person/person.DELETE.spec";
import personGETSpec from "./integrationTests/person/person.GET.spec";
import personPOSTSearchSpec from "./integrationTests/person/person.POST.search.spec";
import personPOSTSpec from "./integrationTests/person/person.POST.spec";
import personPUTSpec from "./integrationTests/person/person.PUT.spec";

describe("Unit testing", function (this: Suite) {
  describe("getUserData", getUserDataSpec);
});

describe("Integration testing", function (this: Suite) {
  describe("Person", () => {
    describe("GET /person", personGETSpec);
    describe("POST /person/search", personPOSTSearchSpec);
    describe("POST /person", personPOSTSpec);
    describe("PUT /person", personPUTSpec);
    describe("DELETE /person", personDELETESpec);
  });
});
