import app from "./app";
const port = 3000;
export default {
  port,
  fetch: app.fetch,
  development: true,
}
console.log("Server is running on port", port);

export type AppType = typeof app;
