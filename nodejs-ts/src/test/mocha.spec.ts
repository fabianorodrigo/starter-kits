// This is the root test file that will import all my test suites

import {Suite} from "mocha";
import arraysSpec from "../services/arrays/arrays.spec";
import regexpSpec from "../services/regexp/regexp.spec";

describe("Server unit testing", function (this: Suite) {
  describe("arrays", arraysSpec);
  describe("regexp", regexpSpec);
});
