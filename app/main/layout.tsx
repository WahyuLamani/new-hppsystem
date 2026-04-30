import BottomMenu from "@/components/utils/BottomMenu";
import PopupToast from "@/components/utils/PopupToats";
import { ToastProvider } from "@/components/utils/ToastContext";
import Toasts from "@/components/utils/Toasts";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ToastProvider>
        {children}
        <BottomMenu />
        <Toasts />
        <PopupToast />
      </ToastProvider>
    </>
  );
}
