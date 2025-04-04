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
  get_id: number;
  get_name: string;
  get_vehicle_no: string;
  get_category: string | null;
  get_entry: string;
  get_exit: string | null;
  reason: string;
  department: string;
  length: string | null;
  width: string | null;
  height: string | null;
}


export default function VehiclesTable() {
  const [entries, setEntries] = useState<VehicleEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // Fetch vehicle entries on mount
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch("/api/vehicles", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch vehicle data");
        }

        const data: VehicleEntry[] = await response.json();
        setEntries(data);
      } catch (err: any) {
        console.error("Error fetching vehicles:", err);
        setError(err.message || "An error occurred while fetching vehicles.");
      } finally {
        setLoading(false);
      }
    };

    fetchVehicles();
  }, []);

  const handleExit = (id: number) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.get_id === id
          ? { ...entry, get_exit: new Date().toISOString() } // Use ISO format for consistency
          : entry
      )
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.get_id}>
                <TableCell className="font-semibold">
                  {entry.get_name}
                </TableCell>
                <TableCell>{entry.get_vehicle_no}</TableCell>
                <TableCell>{entry.get_category || "N/A"}</TableCell>
                <TableCell>
                  {new Date(entry.get_entry).toLocaleString()}
                </TableCell>
                <TableCell>
                  {entry.get_exit
                    ? new Date(entry.get_exit).toLocaleString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <Badge className="bg-blue-700 text-white">
                    {entry.reason || "N/A"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{entry.department || "N/A"}</Badge>
                </TableCell>
                <TableCell>
                  {entry.length || "N/A"} × {entry.width || "N/A"} ×{" "}
                  {entry.height || "N/A"}
                </TableCell>
                <TableCell>
                  {!entry.get_exit ? (
                    <Badge
                      className="bg-red-500 text-white cursor-pointer hover:bg-[#2d2d2d]"
                      onClick={() => handleExit(entry.get_id)}
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
        </Table>
      </CardContent>
    </Card>
  );
}
