"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Chat",
    href: "/dashboard/chat",
  },
  {
    name: "Upload",
    href: "/dashboard/upload",
  },
  {
    name: "Timeline",
    href: "/dashboard/timeline",
  },
  {
    name: "Documents",
    href: "/dashboard/documents",
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen border-r p-6">
      <h1 className="text-2xl font-bold mb-8">
        🩺 MedInfer
      </h1>

      <nav className="flex flex-col gap-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={
              pathname === link.href
                ? "font-bold"
                : ""
            }
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}