"use client";

import { Input } from "@/components/ui/input";
import { Bell, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/context/SearchContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { setSearchTerm } = useSearch();
  const [query, setQuery] = useState("");

  // Debounce to reduce API calls
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchTerm(query);
    }, 300); // Adjust delay as needed

    return () => clearTimeout(timeout);
  }, [query, setSearchTerm]);

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
        <Input
          placeholder="Type to search"
          className="rounded-lg"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

    </nav>
  );
}
