'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter()
  route.replace("/dashboard")
  return (
    <>
      <h1>Home</h1>
    </>
  );
}
