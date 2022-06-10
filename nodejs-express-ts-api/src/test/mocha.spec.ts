// This is the root test file that will import all my test suites

import {Suite} from "mocha";
import getUserDataSpec from "../services/user.service.spec";

describe("Server unit testing", function (this: Suite) {
  describe("getUserData", getUserDataSpec);
});
