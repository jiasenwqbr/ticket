import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/button";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { Spacer } from "@nextui-org/react";
export default function Home() {
  return (
    <div>
      <header className="w-full h-14">
        <div className="fixed top-4 right-8 flex justify-items-stretch items-center">
          <ThemeSwitcher />
          <Spacer x={4} />
          <UserButton />
        </div>
      </header>
      <div className="flex items-center justify-center m-4">
        <main className="flex flex-col items-center justify-center w-full boder-x-2 sm:w-full md:w-9/12 lg:w-6/12"></main>
      </div>
    </div>
  );
}
