'use client';

import { useEffect, useState } from 'react';
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

interface Entry {
  id: number;
  name: string;
  mobile: string;
  inTime: string;
  outTime: string;
  reason: string;
  department: string;
}

export default function EntryTable() {
  const [entries, setEntries] = useState<Entry[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Replace with actual API call
      const mockData: Entry[] = [
        {
          id: 1,
          name: 'Rupak Gupta',
          mobile: '9137423687',
          inTime: '5:06',
          outTime: '8:01',
          reason: 'Fest Promotion',
          department: 'All',
        },
      ];
      setEntries(mockData);
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
