import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Redis } from "ioredis";
import { env } from "~/env.mjs";

type Customer = {
  id: string;
  City: string;
  Company: string;
  Country: string;
  Customer_Id: string;
  First_Name: string;
  Last_Name: string;
  Phone_1: string;
};

const client = new Redis(env.REDIS_URL);

export const exampleRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    // Check if data in cache/ if not save to cache and return data
    const cache = await client.get("users");
    if (!cache) {
      const data = await ctx.prisma.import.findMany();
      await client.set("users", JSON.stringify(data));
      return data;
    }
    // set expire to 100s
    await client.expire("users", 100);
    return JSON.parse(cache) as Customer[];
  }),
});
``;
