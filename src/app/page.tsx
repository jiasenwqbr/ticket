import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserButton />
    </main>
  );
}
