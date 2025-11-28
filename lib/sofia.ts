import { prisma } from "@/lib/db";

export async function processWithSofia(message: string, userId: string) {
  const cleanMessage = message.trim();

  // 1. Detectar RECEITA (Ex: "+50" ou "+100 salario")
  // Regex para capturar + seguido de numero
  const incomeMatch = cleanMessage.match(/^\+(\d+(\.\d{1,2})?)\s*(.*)/);
  
  if (incomeMatch) {
    const amount = parseFloat(incomeMatch[1]);
    const description = incomeMatch[3] || "Receita via WhatsApp";

    // Buscar categoria padrão
    let category = await prisma.category.findFirst({
      where: { userId, name: "WhatsApp" }
    });

    // Se não existir, cria a categoria WhatsApp
    if (!category) {
      category = await prisma.category.create({
        data: {
          name: "WhatsApp",
          type: "INCOME", // Cria como INCOME inicialmente
          userId,
          color: "#25D366"
        }
      });
    }

    // Criar transação
    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type: "INCOME",
        description,
        date: new Date(),
        categoryId: category.id,
        isRecurring: false
      }
    });

    return `✅ Receita de R$ ${amount.toFixed(2)} registrada!\n📝 Desc: ${description}`;
  }

  // 2. Detectar DESPESA (Ex: "-30" ou "-30 uber")
  const expenseMatch = cleanMessage.match(/^-(\d+(\.\d{1,2})?)\s*(.*)/);

  if (expenseMatch) {
    const amount = parseFloat(expenseMatch[1]);
    const description = expenseMatch[3] || "Despesa via WhatsApp";

    // Buscar ou criar categoria (reusando lógica simples)
    let category = await prisma.category.findFirst({
      where: { userId, name: "WhatsApp" }
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: "WhatsApp",
          type: "EXPENSE",
          userId,
          color: "#25D366"
        }
      });
    }

    await prisma.transaction.create({
      data: {
        userId,
        amount,
        type: "EXPENSE",
        description,
        date: new Date(),
        categoryId: category.id,
        isRecurring: false
      }
    });

    return `💸 Despesa de R$ ${amount.toFixed(2)} registrada!\n📝 Desc: ${description}`;
  }

  // 3. Detectar RELATÓRIO (Ex: "rel" ou "resumo")
  if (cleanMessage.toLowerCase().startsWith("rel") || cleanMessage.toLowerCase().includes("resumo")) {
    const today = new Date();
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
    
    // Buscar transações do mês
    const transactions = await prisma.transaction.findMany({
      where: {
        userId,
        date: { gte: firstDay }
      }
    });

    const income = transactions
      .filter(t => t.type === "INCOME")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const expense = transactions
      .filter(t => t.type === "EXPENSE")
      .reduce((acc, curr) => acc + Number(curr.amount), 0);

    const balance = income - expense;

    return `📊 *Relatório do Mês*\n\n💰 Receitas: R$ ${income.toFixed(2)}\n💸 Despesas: R$ ${expense.toFixed(2)}\n\n⚖️ *Saldo: R$ ${balance.toFixed(2)}*`;
  }

  // 4. Mensagem Genérica (Fallback)
  return `🤖 Olá! Sou sua assistente financeira.\n\nComandos disponíveis:\n\n🟢 *Receita:* Envie "+50" ou "+50 Salario"\n🔴 *Despesa:* Envie "-30" ou "-30 Pizza"\n📊 *Relatório:* Envie "rel"`;
}