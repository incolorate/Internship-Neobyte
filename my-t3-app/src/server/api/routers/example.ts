import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Redis } from "ioredis";
import { env } from "~/env.mjs";
import bcrypt from "bcrypt";
import { Hash } from "crypto";
import nodemailer from "nodemailer";

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
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check if username is in use
      const saltRounds = 10;
      const hash = bcrypt.hashSync(input.password, saltRounds);
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

      const checkMatch = bcrypt.compareSync(input.password, user.password);
      if (!checkMatch) return;
      let arr = [];
      if (checkMatch) {
        // Generate key
        while (arr.length < 6) {
          const number = Math.floor(Math.random() * 10);
          if (
            arr[arr.length - 1] + 1 !== number &&
            arr[arr.length - 1] !== number
          ) {
            arr.push(number);
          }
        }

        await ctx.prisma.user.update({
          where: {
            email: input.email,
          },
          data: {
            validationCode: arr.join(""),
          },
        });
      }
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "b4327d3329c77c",
          pass: "29daa3180ba1f2",
        },
      });
      var mailOptions = {
        from: "blah@example.com",
        to: "blabla@example.com",
        subject: "Test Email",
        text: `Your activation code ${arr.join("")}`,
        html: `<p>Your activation code ${arr.join("")}</p>`,
      };

      transport.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("Error occurred:", error.message);
        } else {
          console.log("Email sent successfully!");
          console.log("Message ID:", info.messageId);
        }
      });

      return arr.join("");
    }),

  // handleTwoFactoA: publicProcedure
  //   .input(
  //     z.object({
  //       email: z.string(),
  //       session: z.string(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {

  //     const user = await ctx.prisma.user.findUnique({
  //       where: { email: input.email },
  //     });
  //     const arr = [];
  //     if (!user) {
  //       await ctx.prisma.user.create({
  //         data: {
  //           email: input.email,
  //           session: input.session,
  //         },
  //       });
  //     }
  //     // Geenrate validation
  //     while (arr.length < 6) {
  //       const number = Math.floor(Math.random() * 10);
  //       if (arr[arr.length - 1] + 1 !== number && arr[arr.length] !== number) {
  //         arr.push(number);
  //       }
  //     // asign validation code to account
  //     await ctx.prisma.user.update({
  //         where: {
  //           email: input.email,
  //         },
  //         data: {
  //           validationCode: arr.join(""),
  //         },
  //       });
  //       // Send validation to email
  //       var mailOptions = {
  //         from: "blah@example.com",
  //         to: "blabla@example.com",
  //         subject: "Test Email",
  //         text: `Your activation code ${arr.join("")}`,
  //         html: `<p>Your activation code ${arr.join("")}</p>`,
  //       };

  //     }

  //     // Send the email

  //     await ctx.prisma.user.update({
  //       where: {
  //         email: input.email,
  //       },
  //       data: {
  //         validationCode: arr.join(""),
  //         session: input.session,
  //       },
  //     });

  //     transport.sendMail(mailOptions, function (error, info) {
  //       if (error) {
  //         console.log("Error occurred:", error.message);
  //       } else {
  //         console.log("Email sent successfully!");
  //         console.log("Message ID:", info.messageId);
  //       }
  //   }),
  // handleValidation: publicProcedure
  //   .input(z.object({ validation: z.string() }))
  //   .query(async ({ ctx, input }) => {
  //     const user = await ctx.prisma.user.findUnique({
  //       where: { validationCode: input.validation },
  //     });
  //     if (!user) {
  //       return false;
  //     }
  //     return user.session;
  //   }),
});
