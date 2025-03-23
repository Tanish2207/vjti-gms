import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="h-screen flex flex-col gap-4 justify-center items-center">
      <h1 className="text-4xl text-blue-400 font-bold">
        Welcome to VJTI-GMS (Gate Management System)
      </h1>
        <Button>Click me </Button>
    </div>
  );
}
