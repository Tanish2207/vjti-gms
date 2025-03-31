"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSearch } from "@/context/SearchContext";
import LoadingSpinner from "@/components/ui/throbber";

interface Entry {
  id: number;
  name: string;
  mobile: string;
  inTime: string;
  outTime: string | null;
  reason: string;
  department: string;
}

export default function VisitorsTable() {
  const { searchTerm } = useSearch();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setEntries([]);
      setLoading(true);
      try {
        const response = await fetch(
          `/api/humans?term=${encodeURIComponent(searchTerm)}`
        );
        if (!response.ok) throw new Error("Failed to fetch visitor data");

        const data = await response.json();

        interface EntryData {
          get_id: number;
          get_name: string;
          get_mobile: string;
          get_entry: string;
          get_exit: string | null;
        }

        const formattedEntries: Entry[] = data.map((entry: EntryData) => ({
          id: entry.get_id,
          name: entry.get_name,
          mobile: entry.get_mobile,
          inTime: new Date(entry.get_entry).toLocaleTimeString(),
          outTime: entry.get_exit
            ? new Date(entry.get_exit).toLocaleTimeString()
            : "N/A",
          reason: "Unknown",
          department: "General",
        }));
        toast.success("Data fetched successfully!");
        setLoading(false);
        setEntries(formattedEntries);
      } catch (error) {
        toast.error(error ? `${error}` : "Error fetching data");
      }
    }

    fetchData();
  }, [searchTerm]);

  const handleExit = (id: number) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id
          ? { ...entry, outTime: new Date().toLocaleTimeString() }
          : entry
      )
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visitor Entries</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Mobile No.</TableHead>
                <TableHead>In Time</TableHead>
                <TableHead>Out Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Department/Class</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            {entries.length ? (
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell className="font-semibold">
                      {entry.name}
                    </TableCell>
                    <TableCell>{entry.mobile}</TableCell>
                    <TableCell>{entry.inTime}</TableCell>
                    <TableCell>{entry.outTime || "Not Exited"}</TableCell>
                    <TableCell>
                      <Badge className="bg-blue-700 text-white">
                        {entry.reason}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{entry.department}</Badge>
                    </TableCell>
                    <TableCell>
                      {!entry.outTime ? (
                        <Badge
                          className="bg-red-500 text-white cursor-default hover:bg-[#2d2d2d]"
                          onClick={() => handleExit(entry.id)}
                        >
                          Mark Exit
                        </Badge>
                      ) : (
                        <span className="text-green-500">Exited</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              </TableBody>
            )}
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
