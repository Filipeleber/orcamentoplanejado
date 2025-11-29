"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // Assuming you have a utility function for classnames
import {
  LayoutDashboard,
  BarChart,
  TrendingUp,
  Tags,
} from "lucide-react";

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/analyses",
    label: "Análises",
    icon: BarChart,
  },
  {
    href: "/dashboard/investments",
    label: "Investimentos",
    icon: TrendingUp,
  },
  {
    href: "/dashboard/categories",
    label: "Categorias",
    icon: Tags,
  },
];

export function DashboardNav() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Orçamento</h2>
      </div>
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-gray-700 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
