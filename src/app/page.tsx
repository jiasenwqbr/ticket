import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UserButton />
      <div>
        <Button>Click me</Button>
      </div>
    </main>
  );
}
