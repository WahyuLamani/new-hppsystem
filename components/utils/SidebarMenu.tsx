"use client"
import { useState, useEffect } from "react"
import {
  Menu,
  X,
  User2,
  LayoutDashboard,
  SquareChartGantt,
  CookingPot,
  ShoppingBag,
  ShoppingCart,
  Scale,
  Boxes,
  ChartNoAxesCombined,
  DollarSign,
  LogOut,
} from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <Menu
        className="material-symbols-outlined text-[#442a22] dark:text-[#ece0dc] cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <Menuitems isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

interface MenuitemsProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Menuitems({ isOpen, onClose }: MenuitemsProps) {
  const pathname = usePathname();
  return (
    <>
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        onClick={onClose}
      />

      {/* Panel Sidebar */}
      <nav
        className={`absolute left-0 top-0 bottom-0 w-72 bg-[#fff9ec] dark:bg-[#1e1c10]
          rounded-r-3xl h-full shadow-[0px_12px_32px_rgba(30,28,16,0.2)] z-50 flex flex-col py-6
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header: Profile */}
        <div className="px-6 mb-8 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <User2 className="w-14 h-14 rounded-2xl object-cover shadow-md" />
            <div className="flex flex-col">
              <span className="font-bold text-xl text-[#442a22]">
                Glaze & Grain
              </span>
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant/70 font-bold">
                Admin Panel
              </span>
            </div>
          </div>
          <div className="bg-[#faf3e0] p-3 rounded-2xl w-full">
            <h3 className="font-bold text-[#442a22] text-sm">
              Chef de Cuisine
            </h3>
            <p className="text-xs text-[#4c4542]">Glaze & Grain Kitchen</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {[
            {
              isActive: false,
              href: "/main/dashboard",
              icon: <LayoutDashboard />,
              label: "Dashboard",
            },
            {
              isActive: false,
              href: "/main/bahan",
              icon: <SquareChartGantt />,
              label: "Master Bahan",
            },
            {
              isActive: false,
              href: "/main/produk",
              icon: <ShoppingBag />,
              label: "Master Produk",
            },
            {
              isActive: false,
              href: "/main/resep",
              icon: <CookingPot />,
              label: "Master Resep",
            },
            {
              isActive: false,
              href: "/main/pembelian",
              icon: <ShoppingCart />,
              label: "Pembelian",
            },
            {
              isActive: false,
              href: "/main/stock-adjust",
              icon: <Scale />,
              label: "Stok Adjustment",
            },
            {
              isActive: false,
              href: "/main/produksi",
              icon: <Boxes />,
              label: "Produksi",
            },
            {
              isActive: true,
              href: "/main/transaksi",
              icon: <DollarSign />,
              label: "Transaksi",
            },
            {
              isActive: false,
              href: "/main/report",
              icon: <ChartNoAxesCombined />,
              label: "Laporan",
            },
          ].map(({ icon, label, href }) => {
            const isActive =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={label}
                className={clsx(
                  "flex items-center gap-4 text-sm tracking-tight",
                  {
                    "text-[#4c4542] hover:bg-[#faf3e0] rounded-full mx-2 px-4 py-3 transition-colors font-medium":
                      !isActive,
                    "bg-[#442a22] text-[#fff9ec] rounded-full mx-2 my-1 px-4 py-3 font-bold transition-all duration-300 shadow-md":
                      isActive,
                  }
                )}
                href={href}
                onClick={onClose}
              >
                <span className="material-symbols-outlined">{icon}</span>
                {label}
              </Link>
            );
          })}
        </div>

        {/* Footer: Sign Out */}
        <div className="mt-auto px-4 pt-6">
          <button className="w-full flex items-center gap-4 text-error bg-error/5 hover:bg-error/10 rounded-full px-4 py-3 transition-colors font-bold text-sm tracking-tight">
            <span className="material-symbols-outlined">
              <LogOut />
            </span>
            Sign Out
          </button>
        </div>
      </nav>
    </>
  );
}