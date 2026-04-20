"use client";
import {
  Boxes,
  ShoppingBag,
  ShoppingCart,
  SquareChartGantt,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import clsx from "clsx";

interface NavItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { icon: SquareChartGantt, label: "Bahan", href: "/main/bahan" },
  { icon: ShoppingBag, label: "Produk", href: "/main/produk" },
  { icon: ShoppingCart, label: "Pembelian", href: "/main/pembelian" },
  { icon: Boxes, label: "Produksi", href: "/main/produksi" },
];

export default function BottomMenu() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] rounded-full bg-[#e9e2d0]/80 backdrop-blur-xxl dark:bg-[#4c4542]/80 shadow-[0px_12px_32px_rgba(30,28,16,0.06)] flex justify-around items-center p-2">
      {NAV_ITEMS.map(({ icon: Icon, label, href }) => {
        const isActive = pathname === href;

        return (
          <Link
            key={href}
            href={href}
            className={clsx(
              "flex flex-col items-center justify-center rounded-full w-16 h-16 transition-transform",
              isActive
                ? "bg-[#442a22] dark:bg-[#d6eba6] text-[#fff9ec] dark:text-[#141f00] scale-100"
                : "text-[#4c4542] dark:text-[#ece0dc] hover:scale-105"
            )}
          >
            <Icon size={20} />
            <span className="text-[7px] uppercase tracking-widest font-bold mt-1">
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
