import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from 'hono/logger'
import { testRoute } from "@/routes/test.route";
import { questionsRoute } from "@/routes/questions.route";

const app = new Hono({ strict: false,})
  .basePath("/api")
  .use( "*", cors({
    origin: (origin) => origin,
    credentials: true,
    allowMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    exposeHeaders: ['Set-Cookie'],
    maxAge: 86400,
  }))
  .use(logger())
  .route("/test", testRoute)
  .route("/questions", questionsRoute)
  
export default app;
