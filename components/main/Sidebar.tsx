"use client"
import {LayoutDashboard, LogOut, NotebookTabs, Package2, Plus, ScrollText } from "lucide-react";
import MainLogo from "@/components/utils/MainLogo";
import Link from "next/link";

export default function Sidebar() {
    return(
        <>
          <aside className="h-screen w-72 fixed left-0 top-0 border-r-0 bg-slate-50 dark:bg-slate-950 flex flex-col py-8 gap-y-2 z-50">
            <div className="px-8 mb-8">
              <div className="flex items-center">
              <MainLogo width={50} height={50} className="cursor-pointer mr-2"/>
                <div>
                  <h1 className="font-manrope font-bold text-teal-900 dark:text-teal-50 text-xl tracking-tight">
                    HPP Calculator
                  </h1>
                  <p className="font-inter uppercase text-[10px] tracking-[0.05em] text-slate-500">
                    Margin Control
                  </p>
                </div>
              </div>
            </div>
            <nav className="flex-1 px-4 space-y-1">
              {/* Dashboard Active */}
              <Link className="flex items-center text-teal-800 dark:text-teal-100 font-bold bg-white dark:bg-slate-900 rounded-lg shadow-sm px-4 py-3 ml-2 translate-x-1 duration-200" href="/dashboard">
                <LayoutDashboard className="material-symbols-outlined mr-3" />
                <span className="font-inter uppercase text-xs tracking-[0.05em]">
                  Dashboard
                </span>
              </Link>
              <Link className="flex items-center text-slate-600 dark:text-slate-400 px-4 py-3 ml-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-all" href="#">
                <Package2 className="material-symbols-outlined mr-3" />
                <span className="font-inter uppercase text-xs tracking-[0.05em]">
                  Bahan Baku
                </span>
              </Link>
              <Link className="flex items-center text-slate-600 dark:text-slate-400 px-4 py-3 ml-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-all" href="#">
              <ScrollText className="material-symbols-outlined mr-3" />
                <span className="font-inter uppercase text-xs tracking-[0.05em]">
                  Formulasi Produk
                </span>
              </Link>
              <Link className="flex items-center text-slate-600 dark:text-slate-400 px-4 py-3 ml-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-all" href="#">
                <NotebookTabs className="material-symbol-outlined mr-3" />
                <span className="font-inter uppercase text-xs tracking-[0.05em]">
                  Katalog
                </span>
              </Link>
            </nav>
            <div className="px-6 mt-6">
              <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary font-manrope font-semibold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
                <Plus className="material-symbols-outlined text-sm" />
                <span className="text-xs uppercase tracking-widest">
                  Tambah Produk Baru
                </span>
              </button>
            </div>
            <div className="mt-auto px-4 space-y-1 border-t border-outline-variant/10 pt-6">
              <Link className="flex items-center text-slate-600 dark:text-slate-400 px-4 py-3 ml-2 hover:bg-slate-200/50 dark:hover:bg-slate-800/50 rounded-lg transition-all text-error" href="#">
                <LogOut className="material-symbols-outlined mr-3" />
                <span className="font-inter uppercase text-xs tracking-[0.05em]">
                  Keluar
                </span>
              </Link>
            </div>
          </aside>
        </>
    )
}