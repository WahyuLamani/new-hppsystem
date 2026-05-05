import BottomMenu from "@/components/utils/BottomMenu";
import { Toaster } from "sonner";
import PopupToast from "@/components/utils/PopupToats";
import { ToastProvider } from "@/components/utils/ToastContext";
import Toasts from "@/components/utils/Toasts";
export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <BottomMenu />
      <Toaster position="top-center" richColors />
    </>
  );
}
