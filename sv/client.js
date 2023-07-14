import { createClient } from "redis";

let client;
// Await client connection
(async () => {
  client = createClient();

  client.on("error", (error) => console.error(`Error : ${error}`));

  await client.connect();
  console.log("Redis connected");
})();

export default client;
