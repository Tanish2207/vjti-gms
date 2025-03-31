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
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/humans");
        if (!response.ok) {
          throw new Error("Failed to fetch visitor data");
        }
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
          outTime: entry.get_exit ? new Date(entry.get_exit).toLocaleTimeString() : "N/A",
          reason: "Unknown", // Placeholder as API does not provide reason
          department: "General", // Placeholder as API does not provide department
        }));
        toast.success("Data fetched successfully!");
        setEntries(formattedEntries);
      } catch (error) {
        toast.error(error ? `Error fetching data: ${error}` : "Error fetching data");
      }
    }

    fetchData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Visitor Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Mobile No.</TableHead>
              <TableHead>In Time</TableHead>
              <TableHead>Out Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Department/Class</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-semibold">{entry.name}</TableCell>
                <TableCell>{entry.mobile}</TableCell>
                <TableCell>{entry.inTime}</TableCell>
                <TableCell>{entry.outTime}</TableCell>
                <TableCell>
                  <Badge className="bg-blue-700 text-white">{entry.reason}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{entry.department}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
