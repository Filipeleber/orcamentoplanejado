import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { processWithSofia } from "@/lib/sofia";

export async function POST(req: Request) {
  // Log para ver se a requisição chega aqui
  console.log("🚀 A REQUISIÇÃO CHEGOU NA API!");

  try {
    const body = await req.json();
    const { phoneNumber, message } = body;

    console.log("Dados recebidos:", { phoneNumber, message });

    // 1. Buscar usuário pelo telefone
    const user = await prisma.user.findFirst({
      where: { phone: phoneNumber }
    });

    // 2. Se não existir
    if (!user) {
      const registerUrl = `https://orcamento-planejado.abacusai.app/auth/register?phone=${phoneNumber}`;
      return NextResponse.json({
        response: `Olá! Não encontrei uma conta vinculada a este número.\n\nCadastre-se aqui: ${registerUrl}`
      });
    }

    // 3. Processar mensagem com a Sofia
    const result = await processWithSofia(message, user.id);

    return NextResponse.json({ response: result });

  } catch (error) {
    console.error("Erro no webhook:", error);
    return NextResponse.json(
      { response: "❌ Erro interno." },
      { status: 500 }
    );
  }
}