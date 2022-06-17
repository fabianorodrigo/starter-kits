import chai, {expect} from "chai";
import {GithubService} from "./gitHub.service";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";

import {RedisService} from "./../services/redis.service";

chai.use(chaiAsPromised);

export default function () {
  describe(`${GithubService.name}`, function () {
    sinon.stub(RedisService, "getInstance").callsFake(() => {
      return {} as RedisService;
    });
    let githubService: GithubService;
    beforeEach(function () {
      githubService = new GithubService();
    });

    it(`# should get avatar url and the sum of stars of all repositories starred by the user when the user exists`, async function () {
      const userDTO = await githubService.getUserData("fabianorodrigo");
      expect(userDTO.avatar).to.eql(
        "https://avatars.githubusercontent.com/u/23061789?v=4"
      );
    });
    it(`# should throw error when the user does NOT exists`, async function () {
      await expect(githubService.getUserData("54d54d5d45d")).to.be.rejectedWith(
        `Not Found`
      );
    });
  });
}
