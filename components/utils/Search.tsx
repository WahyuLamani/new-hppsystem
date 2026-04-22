"use client"
import { Search } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({placeholder="Cari ...",paramKey="query"
}:SearchProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter()

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
          params.set(paramKey, term);
        } else {
          params.delete(paramKey);
        }
    
        replace(`${pathname}?${params.toString()}`);
      }, 300);
  return (
    <>
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="material-symbols-outlined text-on-surface-variant opacity-60" />
        </div>
        <input
          className="w-full bg-surface-container-low border-none rounded-full py-4 pl-12 pr-6 text-on-surfac font-medium placeholder:opacity-50 transition-all"
          placeholder={placeholder}
          type="text"
          defaultValue={searchParams.get(paramKey) ?? ""}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </>
  );
}
