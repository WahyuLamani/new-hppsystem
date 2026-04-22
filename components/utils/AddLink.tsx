import { Plus } from "lucide-react";
import Link from "next/link";

export default function AddLink({href}:{href:string}){
    return(
        <Link
        href={href}
        className="fixed bottom-28 right-1/2 translate-x-[180px] w-14 h-14 bg-primary text-on-primary rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-90 transition-transform z-[60]"
      >
        <span className="material-symbols-outlined text-3xl">
          <Plus />
        </span>
      </Link>
    )
}