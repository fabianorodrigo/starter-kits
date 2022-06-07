import express from "express";
import axios from "axios";
import cors from "cors";

interface Stars {
  stargazers_count: number;
}

const app = express();
app.use(cors());
const port = 3000;

let cache = {};

app.get("/", async (req, res) => {
  const name = req.query["username"] as string;
  console.log("name", name);
  if (!cache[name]) {
    console.log(`WE HAD TO FETCH`);
    let resultUser;
    let stars = 0;
    try {
      resultUser = await axios.get(`https://api.github.com/users/${name}`);
    } catch (e) {
      console.log(`Problems with user`);
    }
    try {
      const resultStars: Stars[] = await axios.get(
        `https://api.github.com/users/${name}/starred`,
        {
          headers: {Accept: "application/vnd.github.v3+json"},
        }
      );

      for (let i = 0; i < resultStars.length; i++) {
        stars += resultStars[i].stargazers_count;
      }
    } catch (e) {
      console.log(`Problems with user`);
    }
    //stargazers_count
    cache[name] = {avatar: resultUser.data.avatar_url, stars: stars};
  }
  res.json(cache[name]);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
