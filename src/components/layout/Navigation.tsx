"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { name: "Status", href: "/dashboard" },
  { name: "Devices", href: "/devices" },
  { name: "Schematic", href: "/schematic" },
  { name: "Settings", href: "/settings" },
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-border bg-primary-900 text-white">
      <div className="px-6">
        <div className="flex h-14 items-center space-x-3 justify-between sm:justify-start sm:space-x-8">
          {navigationItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex text-sm h-full items-center border-b-2 px-2 sm:text-lg font-medium transition-colors ${
                  isActive
                    ? "border-primary text-orange-400"
                    : "border-transparent  hover:text-orange-400"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
