import app from "./app";

export default {
  port:3000,
  fetch: app.fetch,
  development: true,
}

export type AppType = typeof app;
