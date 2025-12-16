"use client";

import Navbar from "@/components/Navbar";
import VehiclesForm from "@/app/vehicles/EntryForm";
import VehiclesTable from "@/app/vehicles/EntryTable";
import Sidebar from "@/components/Sidebar";
import "@/app/globals.css";
import { useEffect, useState } from "react";

interface Reason {
  get_reason_id: number;
  get_reason: string;
}

export default function VehiclesPage() {
  const [reasonArr, setReasonArr] = useState<Reason[]>([]); // Corrected initialization

  // Fetch reasons on mount
  useEffect(() => {
    const fetchReasons = async () => {
      try {
        const response = await fetch("/api/visit_reasons");
        if (!response.ok) throw new Error("Failed to fetch visit reasons");

        const data: Reason[] = await response.json();
        setReasonArr(data); // Update state with fetched reasons
      } catch (err) {
        console.error("Error fetching reasons:", err);
      }
    };

    fetchReasons();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex h-full bg-[#fafafb]">
        {/* Sidebar */}
        {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
        <Sidebar />

        <main className="flex flex-col w-full gap-4 py-4 px-4">
          <VehiclesForm reasonArr={reasonArr} />
          <VehiclesTable />
        </main>
      </div>
    </>
  );
}
