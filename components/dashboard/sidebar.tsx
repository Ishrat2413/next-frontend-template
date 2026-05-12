"use client";

import { useAuth } from "@/providers/auth-provider";
import { DASHBOARD_NAVIGATION } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

export function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  if (!user) return null;

  const navItems = DASHBOARD_NAVIGATION[user.role];

  return (
    <aside className="w-64 border-r bg-white h-screen flex flex-col p-4">
      <div className="mb-8 p-2">
        <h2 className="font-bold text-lg">{user.name}</h2>
        <p className="text-sm text-slate-500">{user.role.toUpperCase()}</p>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 p-2 rounded ${
                isActive ? "bg-slate-100 text-black" : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 p-2 text-red-600 hover:bg-red-50 rounded mt-auto"
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}
