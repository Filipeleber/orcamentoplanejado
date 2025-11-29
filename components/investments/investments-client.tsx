"use client";

import React from "react";

interface InvestmentsClientProps {
  initialGoals: any[];
  initialInvestments: any[];
}

export const InvestmentsClient = ({ initialGoals, initialInvestments }: InvestmentsClientProps) => {
  return (
    <div>
      <h1 className="text-2xl font-bold">Investimentos</h1>
      <p>Componente de cliente para a página de investimentos.</p>
    </div>
  );
}
