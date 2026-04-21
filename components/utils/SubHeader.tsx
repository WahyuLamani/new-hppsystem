"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubHeader({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter();
  return (
    <>
      <header className=" sticky top-0 z-50 bg-[#fff9ec] dark:bg-[#1e1c10]">
        <div className="flex items-center px-6 py-4 justify-between ">
          <div className="flex items-center gap-4">
            <button
              className="hover:opacity-80 transition-opacity active:scale-95 duration-200"
              onClick={() => router.back()}
            >
              <span className="material-symbols-outlined text-[#442a22] dark:text-[#ece0dc]">
                <ArrowLeft />
              </span>
            </button>
            {children}
          </div>
        </div>
      </header>
    </>
  );
}
