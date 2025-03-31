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

interface KeyEntry {
  id: number;
  personName: string;
  keyType: string;
  issueTime: string;
  returnTime: string;
  reason: string;
  department: string;
}

export default function EntryTable() {
  const [entries, setEntries] = useState<KeyEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Replace with actual API call
      const mockData: KeyEntry[] = [
        {
          id: 1,
          personName: "John Doe",
          keyType: "Room Key",
          issueTime: "09:30",
          returnTime: "12:00",
          reason: "Maintenance",
          department: "IT",
        },
      ];
      setEntries(mockData);
    }

    fetchData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Key Issue Records</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Person Name</TableHead>
              <TableHead>Key Type</TableHead>
              <TableHead>Issue Time</TableHead>
              <TableHead>Return Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Department</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-semibold">{entry.personName}</TableCell>
                <TableCell>{entry.keyType}</TableCell>
                <TableCell>{entry.issueTime}</TableCell>
                <TableCell>{entry.returnTime}</TableCell>
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
