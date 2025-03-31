"use client";

import { usePathname } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Car, Key } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[20%] min-h-screen bg-transparent p-4">
      {/* Connect New Account Button */}
      <Button className="w-full flex items-center justify-center bg-[#4f46e5] hover:bg-purple-700 text-white mb-4">
        + Connect New Account
      </Button>

      {/* Menu Items */}
      <nav className="space-y-2">
        <div className="text-xs text-gray-400 mt-4 mb-2">ENTRIES</div>

        <Link 
          href="/visitors" 
          className={cn(
            "flex items-center space-x-2 p-2 rounded-lg", 
            pathname === "/visitors" ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:text-black"
          )}
        >  
          <Users className="w-5 h-5" />
          <span>Visitors</span>
        </Link>

        <Link 
          href="/vehicles" 
          className={cn(
            "flex items-center space-x-2 p-2 rounded-lg", 
            pathname === "/vehicles" ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:text-black"
          )}
        >
          <Car className="w-5 h-5" />
          <span>Vehicles</span>
        </Link>

        <Link 
          href="/keys" 
          className={cn(
            "flex items-center space-x-2 p-2 rounded-lg", 
            pathname === "/keys" ? "bg-blue-100 text-blue-600" : "text-gray-700 hover:text-black"
          )}
        >
          <Key className="w-5 h-5" />
          <span>Keys</span>
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;