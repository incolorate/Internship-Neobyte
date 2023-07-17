import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const allData = ctx.prisma.import.findMany();
    return allData;
  }),
});
``;
