import {APIResponse, Repository} from "../model";
import {User, UserDTO} from "../model/userGithub.interface";
import {BaseHttpService} from "./baseHttpService";

export class GithubService extends BaseHttpService<UserDTO> {
  constructor() {
    super("https://api.github.com");
  }

  async getUserData(name: string): Promise<UserDTO> {
    // search for user
    const userResponse: APIResponse<User> = await this.getData<User>(
      `/users/${name}`
    );
    if (!userResponse.success) {
      throw new Error(userResponse.message);
    }

    // search for stared repos
    const reposStaredResponse: APIResponse<ReadonlyArray<Repository>> =
      await this.getData<ReadonlyArray<Repository>>(`/users/${name}/starred`, {
        headers: {Accept: "application/vnd.github.v3+json"},
      });
    if (!reposStaredResponse.success) {
      throw new Error(reposStaredResponse.message);
    }
    let stars = 0;
    for (let i = 0; i < reposStaredResponse.result.length; i++) {
      stars += reposStaredResponse.result[i].stargazers_count;
    }

    return {
      avatar: userResponse.result.avatar_url,
      stars: stars,
    };
  }
}
