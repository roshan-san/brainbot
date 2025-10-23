import { Hono } from "hono";

export const testRoute = new Hono()
    .get("/", async (c)=>{
        return c.json({
            message:"hello form test route"
        })
    })