import chai, {expect} from "chai";
import {getGithubUserData} from "./user.service";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

export default function () {
  describe(`${getGithubUserData.name}`, function () {
    it(`# should get avatar url and the sum of stars of all repositories starred by the user when the user exists`, async function () {
      const userDTO = await getGithubUserData("fabianorodrigo");
      expect(userDTO.avatar).to.eql(
        "https://avatars.githubusercontent.com/u/23061789?v=4"
      );
    });
    it(`# should throw error when the user does NOT exists`, async function () {
      await expect(getGithubUserData("54d54d5d45d")).to.be.rejectedWith(
        `Not Found`
      );
    });
  });
}
