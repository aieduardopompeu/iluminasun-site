import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("leads.create", () => {
  it("should create a lead with valid data", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const leadData = {
      name: "João Silva",
      email: "joao@example.com",
      phone: "(11) 98765-4321",
      city: "São Paulo",
      state: "SP",
      averageBill: "R$ 500,00",
      propertyType: "residencial" as const,
      message: "Gostaria de receber um orçamento para minha residência",
    };

    const result = await caller.leads.create(leadData);

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("leadId");
  });

  it("should fail without required name field", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const leadData = {
      name: "",
      email: "joao@example.com",
    };

    await expect(caller.leads.create(leadData as any)).rejects.toThrow();
  });

  it("should fail with invalid email", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const leadData = {
      name: "João Silva",
      email: "invalid-email",
    };

    await expect(caller.leads.create(leadData as any)).rejects.toThrow();
  });

  it("should create lead with minimal required fields", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const leadData = {
      name: "Maria Santos",
      email: "maria@example.com",
    };

    const result = await caller.leads.create(leadData);

    expect(result).toHaveProperty("success", true);
    expect(result).toHaveProperty("leadId");
  });
});
