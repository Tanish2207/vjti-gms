"use client";

import Navbar from "@/components/Navbar";
import KeysForm from "@/app/keys/EntryForm";
import KeysTable from "@/app/keys/EntryTable";
import Sidebar from "@/components/Sidebar";
import "@/app/globals.css";

export default function VehiclesPage() {
  return (
    <>
      <Navbar />
      <div className="flex h-full bg-[#fafafb]">
        {/* Sidebar */}
        {/* <Sidebar isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} /> */}
        <Sidebar />

        <main className="flex flex-col w-full gap-4 py-4 px-4">
          <KeysForm />
          <KeysTable />
        </main>
      </div>
    </>
  );
}
