"use client"
import MainLogo from "./MainLogo";

export default function MainHeader({children}: Readonly<{children: React.ReactNode}>) {
    return (
      <header className="bg-[#fff9ec] dark:bg-[#1e1c10] flex justify-between items-center px-6 w-full max-w-[450px] mx-auto pt-6 pb-2">
        {children}
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
          <MainLogo className="" width={40} height={40} />
        </div>
      </header>
    )
}