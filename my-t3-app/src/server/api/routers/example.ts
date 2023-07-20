import { string, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Redis } from "ioredis";
import { env } from "~/env.mjs";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import codeGenerator from "../../helpers/validationCodeGenerator.ts";
import { TRPCError } from "@trpc/server";
import emailTemplate from "~/server/helpers/emailTemplate.ts";

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

// Connect to email service
const transport = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "b4327d3329c77c",
    pass: "29daa3180ba1f2",
  },
});

// Connect to redis server
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
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Hash password
      const saltRounds = 10;
      const hash: string = bcrypt.hashSync(input.password, saltRounds);
      const newUser = ctx.prisma.user.create({
        data: {
          password: hash,
          email: input.email,
        },
      });
      return newUser;
    }),

  handleLogin: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found in db",
        });
      }

      // Verify password
      const checkMatch: boolean = bcrypt.compareSync(
        input.password,
        user.password
      );

      if (!checkMatch) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found in db",
        });
      }
      // Code generator generates a unique 6 digit code
      const validationCode: string = codeGenerator();
      if (checkMatch) {
        await ctx.prisma.user.update({
          where: {
            email: input.email,
          },
          data: {
            validationCode: validationCode,
            codeCreatedAt: Date.now().toString(),
          },
        });
      }

      // Send email, if email fails to send, log error
      transport?.sendMail(
        emailTemplate(validationCode),
        function (error, info) {
          if (error) {
            console.log("Error occurred:", error.message);
          } else {
            console.log("Email sent successfully!");
            console.log("Message ID:", info.messageId);
          }
        }
      );

      return validationCode;
    }),
  codeVerification: publicProcedure
    .input(z.object({ email: z.string(), sendAt: z.number() }))
    .mutation(({ ctx, input }) => {
      const userData = ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!userData) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email not found in db",
        });
      }

      if (!(Number(userData.codeCreatedAt) - Number(input.sendAt) > 60)) {
        return false;
      }

      return true;
    }),
});
