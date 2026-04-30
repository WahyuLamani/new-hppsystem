"use client"

import { useEffect } from "react";
import { useToast } from "@/components/utils/ToastContext";
import { usePathname } from "next/navigation";

export default function PopupToast(){
    const { show } = useToast()
    const pathname = usePathname()
    useEffect(() => {
        const raw = sessionStorage.getItem("toast");
        if (!raw) return;
      
        sessionStorage.removeItem("toast");
        show(JSON.parse(raw));
      }, [pathname]);
    return null;
}