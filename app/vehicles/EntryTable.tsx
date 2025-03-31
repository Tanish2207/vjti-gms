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

interface VehicleEntry {
  id: number;
  driverName: string;
  vehicleNo: string;
  vehicleType: string;
  entryTime: string;
  exitTime: string;
  reason: string;
  department: string;
  length: string;
  width: string;
  height: string;
}

export default function VehiclesTable() {
  const [entries, setEntries] = useState<VehicleEntry[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Replace with actual API call
      const mockData: VehicleEntry[] = [
        {
          id: 1,
          driverName: "John Doe",
          vehicleNo: "XYZ 1234",
          vehicleType: "Truck",
          entryTime: "10:30",
          exitTime: "14:00",
          reason: "Delivery",
          department: "Logistics",
          length: "6.5",
          width: "2.3",
          height: "3.0",
        },
      ];
      setEntries(mockData);
    }

    fetchData();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Vehicle Entries</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Driver Name</TableHead>
              <TableHead>Vehicle No.</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Entry Time</TableHead>
              <TableHead>Exit Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Dimensions (L×W×H) (m)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-semibold">{entry.driverName}</TableCell>
                <TableCell>{entry.vehicleNo}</TableCell>
                <TableCell>{entry.vehicleType}</TableCell>
                <TableCell>{entry.entryTime}</TableCell>
                <TableCell>{entry.exitTime}</TableCell>
                <TableCell>
                  <Badge className="bg-blue-700 text-white">{entry.reason}</Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{entry.department}</Badge>
                </TableCell>
                <TableCell>
                  {entry.length} × {entry.width} × {entry.height}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
