"use client";

import Sidebar from "@/components/Sidebar";
import VisitorsForm from "@/app/visitors/EntryForm";
import VisitorsTable from "@/app/visitors/EntryTable";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";
// import { useState } from 'react';

export default function VisitorsPage() {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-[#fafafb]">
        {/* Sidebar */}
        {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
        <Sidebar />

        <main className="flex flex-col w-full gap-4 py-4 px-4">
          <VisitorsForm onEntryAdded={() => {}} />
          <VisitorsTable />
        </main>
      </div>
    </>
  );
}
