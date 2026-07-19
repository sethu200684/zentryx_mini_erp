"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/tasks", label: "Tasks" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="font-semibold text-gray-900">Zentryx ERP</span>
          <div className="hidden sm:flex gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <span className="text-sm text-gray-500">{user?.name}</span>
          <button
            onClick={logout}
            className="text-sm font-medium text-gray-500 hover:text-red-600"
          >
            Log out
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-gray-700"
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 pt-4 border-t border-gray-100">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium ${
                pathname === link.href ? "text-blue-600" : "text-gray-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center justify-between pt-2">
            <span className="text-sm text-gray-500">{user?.name}</span>
            <button
              onClick={logout}
              className="text-sm font-medium text-red-600"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}