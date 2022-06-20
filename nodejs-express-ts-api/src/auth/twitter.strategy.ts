import passport from "passport";
import PassportTwitter, {IStrategyOption, Profile} from "passport-twitter";
import {UserController} from "../controllers";
import {User} from "../model";

export interface ITwitterStrategyResult {
  profileId: string;
  provider: string;
}

const CONFIG: IStrategyOption = {
  consumerKey: process.env.TWITTER_CONSUMER_KEY as string,
  consumerSecret: process.env.TWITTER_CONSUMER_SECRET as string,
  callbackURL: process.env.TWITTER_CONSUMER_CALLBACK_URL as string,
};

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user as User);
});

export async function initAuthTwitterStrategy() {
  const userCtl = new UserController();
  passport.use(
    new PassportTwitter.Strategy(
      CONFIG,
      async (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (err: Error | null, result?: ITwitterStrategyResult) => void
      ) => {
        // The verify function accepts a token, tokenSecret and profile as arguments.
        // token and tokenSecret are used for API access, and are not needed for authentication.

        // console.log(
        //   ` =================== PASSEI AQUI NO VERIFICATION CALLBACK ==================================== `
        // );
        let user;
        try {
          user = await userCtl.authUserByTwitter(profile.id);
          return done(null, {
            profileId: user?.profileId as string,
            provider: user?.provider as string,
          });
        } catch (e) {
          return done(e as Error);
        }
      }
    )
  );
}
