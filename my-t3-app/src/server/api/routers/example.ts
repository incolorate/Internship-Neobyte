import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Redis } from "ioredis";
import { env } from "~/env.mjs";
import bcrypt from "bcrypt";
import { Hash } from "crypto";

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
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if username is in use
      const saltRounds = 10;
      const hash = bcrypt.hashSync(input.password, saltRounds);
      const newUser = ctx.prisma.user.create({
        data: {
          user: input.username,
          password: hash,
          email: input.email,
        },
      });
      return newUser;
    }),
});
