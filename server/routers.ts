import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { createLead, getAllLeads } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    create: publicProcedure
      .input(
        z.object({
          name: z.string().min(1, "Nome é obrigatório"),
          email: z.string().email("Email inválido"),
          phone: z.string().optional(),
          city: z.string().optional(),
          state: z.string().max(2).optional(),
          averageBill: z.string().optional(),
          propertyType: z.enum(["residencial", "comercial", "industrial", "rural"]).optional(),
          message: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const lead = await createLead({
          ...input,
          status: "novo",
        });

        // Notificar o proprietário sobre o novo lead
        await notifyOwner({
          title: "Novo Lead - Iluminasun",
          content: `Nome: ${input.name}\nEmail: ${input.email}\nTelefone: ${input.phone || "Não informado"}\nCidade: ${input.city || "Não informada"}\nMensagem: ${input.message || "Sem mensagem"}`
        });

        return { success: true, leadId: lead };
      }),
    list: protectedProcedure.query(async ({ ctx }) => {
      // Apenas admins podem listar leads
      if (ctx.user.role !== "admin") {
        throw new Error("Acesso negado");
      }
      return await getAllLeads();
    }),
  }),
});

export type AppRouter = typeof appRouter;
