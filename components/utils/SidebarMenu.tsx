"use client"
import { useState, useEffect } from "react"
import { Menu, X, Home, Search, User, Settings, LogOut } from "lucide-react"

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  return (
    <>
      <Menu
        className="text-[#442a22] dark:text-[#ece0dc] cursor-pointer"
        onClick={() => setIsOpen(true)}
      />
      <Menuitems isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

interface MenuitemsProps {
  isOpen: boolean
  onClose: () => void
}

export function Menuitems({ isOpen, onClose }: MenuitemsProps) {
  return (
    <>
      {/* Overlay — absolute mengikuti .canvas-container */}
      <div
        className={`absolute inset-0 bg-black/40 z-40 transition-opacity duration-300
          ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={onClose}
      />

      {/* Panel Sidebar — absolute mengikuti .canvas-container */}
      <aside
        className={`absolute top-0 left-0 h-full w-64 bg-white dark:bg-neutral-900 z-50
          flex flex-col transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 dark:border-neutral-700">
          <span className="font-medium text-[#442a22] dark:text-[#ece0dc]">Menu</span>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <nav className="flex-1 py-3 overflow-y-auto">
          <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider px-5 pb-1">
            Navigasi
          </p>
          {[
            { icon: Home, label: "Beranda" },
            { icon: Search, label: "Cari" },
            { icon: User, label: "Profil" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-3 w-full px-5 py-2.5 text-sm
                text-neutral-700 dark:text-neutral-200
                hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={onClose}
            >
              <Icon size={17} className="opacity-70" />
              {label}
            </button>
          ))}

          <div className="my-2 border-t border-neutral-200 dark:border-neutral-700 mx-4" />

          <p className="text-[11px] font-medium text-neutral-400 uppercase tracking-wider px-5 pb-1">
            Lainnya
          </p>
          {[
            { icon: Settings, label: "Pengaturan" },
            { icon: LogOut, label: "Keluar" },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="flex items-center gap-3 w-full px-5 py-2.5 text-sm
                text-neutral-700 dark:text-neutral-200
                hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              onClick={onClose}
            >
              <Icon size={17} className="opacity-70" />
              {label}
            </button>
          ))}
        </nav>
      </aside>
    </>
  )
}