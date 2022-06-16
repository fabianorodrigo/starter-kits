import {APIResponse, Repository} from "../model";
import {User, UserDTO} from "../model/userGithub.interface";
import {getData} from "./baseHttpService";

export async function getGithubUserData(name: string): Promise<UserDTO> {
  // search for user
  const userResponse: APIResponse<User> = await getData<User>(
    `https://api.github.com/users/${name}`
  );
  if (!userResponse.success) {
    throw new Error(userResponse.message);
  }

  // search for stared repos
  const reposStaredResponse: APIResponse<ReadonlyArray<Repository>> =
    await getData<ReadonlyArray<Repository>>(
      `https://api.github.com/users/${name}/starred`,
      {
        headers: {Accept: "application/vnd.github.v3+json"},
      }
    );
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
