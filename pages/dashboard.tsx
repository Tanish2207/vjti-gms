"use client";

import Sidebar from "@/components/Sidebar";
import EntryForm from "@/components/EntryForm";
import EntryTable from "@/components/EntryTable";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
// import { useState } from 'react';

export default function Dashboard() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-[#fafafb]">
        {/* Sidebar */}
        {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
        <Sidebar />

        <main className="flex flex-col w-full gap-4 py-4 px-4">
          <EntryForm />
          <EntryTable />
        </main>
      </div>
    </>
  );
}
