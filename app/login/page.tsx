"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <p className="text-center mb-6">
          Escolha um provedor para continuar.
        </p>
        <button
          // Note: This requires you to configure at least one provider (e.g., Google)
          // in your lib/auth.ts file for it to work.
          onClick={() => signIn()} // When clicked, this will redirect to the NextAuth.js default sign-in page
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
