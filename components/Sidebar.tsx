'use client';

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Home, Users, Car, Key } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="w-[20%] min-h-screen bg-transparent p-4">
      {/* Connect New Account Button */}
      <Button className="w-full flex items-center justify-center bg-[#4f46e5] hover:bg-purple-700 text-white mb-4">
        + Connect New Account
      </Button>

      {/* Menu Items */}
      <nav className="space-y-2">
        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <Home className="w-5 h-5" />
          <span>Dashboard</span>
        </Link>

        <div className="text-xs text-gray-400 mt-4 mb-2">ANALYTICS</div>

        <Link href="#" className={cn("flex items-center space-x-2 p-2 rounded-lg", "bg-blue-100 text-blue-600")}>  
          <Users className="w-5 h-5" />
          <span>Visitors</span>
        </Link>

        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <Car className="w-5 h-5" />
          <span>Vehicles</span>
        </Link>

        <Link href="#" className="flex items-center space-x-2 text-gray-700 hover:text-black">
          <Key className="w-5 h-5" />
          <span>Keys</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
