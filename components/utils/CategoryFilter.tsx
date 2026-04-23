"use client"
import { useRef } from "react"

export default function CategoryFilter() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
    startX.current = e.pageX - scrollRef.current!.offsetLeft
    scrollLeft.current = scrollRef.current!.scrollLeft
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current!.offsetLeft
    const walk = x - startX.current
    scrollRef.current!.scrollLeft = scrollLeft.current - walk
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].pageX - scrollRef.current!.offsetLeft
    scrollLeft.current = scrollRef.current!.scrollLeft
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const x = e.touches[0].pageX - scrollRef.current!.offsetLeft
    const walk = x - startX.current
    scrollRef.current!.scrollLeft = scrollLeft.current - walk
  }

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-scroll pb-2 no-scrollbar select-none cursor-grab"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={() => (isDown.current = false)}
      onMouseLeave={() => (isDown.current = false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
    >
      <button className="px-6 py-2 bg-primary text-on-primary rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
        Semua
      </button>
      <button className="px-6 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
        Kue Kering
      </button>
      <button className="px-6 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
        Roti
      </button>
      <button className="px-6 py-2 bg-surface-container-highest text-on-surface-variant rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
        Pastry
      </button>
    </div>
  )
}