import BottomMenu from "@/components/utils/BottomMenu";

export default function MainLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <BottomMenu />
    </>
  );
}
