"use client";

import React from "react";

interface AnalysesClientProps {
  analyses: any[];
  hasTransactions: boolean;
}

export const AnalysesClient = ({ analyses, hasTransactions }: AnalysesClientProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Análises</h1>
      <p>Componente de cliente para a página de análises.</p>
    </div>
  );
}
