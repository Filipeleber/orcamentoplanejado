"use client";

import React from "react";

interface DashboardClientProps {
  data: any;
}

export const DashboardClient = ({ data }: DashboardClientProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Dashboard Principal</h1>
      <p className="mt-4 text-muted-foreground">
        Bem-vindo(a) ao seu painel de controle financeiro.
      </p>
    </div>
  );
}
