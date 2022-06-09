// This is the root test file that will import all my test suites

import {Suite} from "mocha";
import arraysSpec from "../services/arrays/arrays.spec";

describe("Server unit testing", function (this: Suite) {
  describe("arrays", arraysSpec);
});
