"use client";

import { Input } from "@/components/ui/input";
import { Bell, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white p-4 border-b">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/">
          <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-white font-bold">V</span>
          </div>
          <span className="font-semibold">VJTI - GMS</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="w-1/3">
        <Input placeholder="Type to search" className="rounded-lg" />
      </div>

      {/* Icons and Profile */}
      <div className="flex items-center space-x-4">
        <div className="relative cursor-pointer">
          <Mail className="w-6 h-6 text-gray-600" />
          <span className="absolute -top-1 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
            2
          </span>
        </div>
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
        <Image
          src="/profile.jpg"
          alt="User Profile"
          width={32}
          height={32}
          className="rounded-full cursor-pointer"
        />
      </div>
    </nav>
  );
}
