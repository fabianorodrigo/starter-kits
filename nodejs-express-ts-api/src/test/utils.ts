export function generateRandomString(myLength: number): string {
  let random = 0;
  while (random == 0) {
    random = Math.random();
  }
  const chars =
    "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
  const randomArray = Array.from(
    {length: myLength},
    (v, k) => chars[Math.floor(random * chars.length)]
  );

  const randomString = randomArray.join("");
  return randomString;
}
