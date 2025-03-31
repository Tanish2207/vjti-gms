import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl text-blue-400 font-bold">
        Welcome to VJTI-GMS (Gate Management System)
      </h1>
      <Link href="/visitors">
        <Button>Click me </Button>
      </Link>
    </div>
  );
}
