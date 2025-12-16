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
import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface VehicleEntry {
  id: number;
  driverName: string;
  vehicleNo: string;
  vehicleType: string;
  entryTime: string;
  exitTime: string | null;
  reason: string;
  department: string;
  length: string;
  width: string;
  height: string;
}

export default function VehiclesTable() {
  const [entries, setEntries] = useState<VehicleEntry[]>([]);
  const [visitReasons, setVisitReasons] = useState(["Delivery", "Maintenance", "Inspection"]);
  const [editingEntry, setEditingEntry] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<VehicleEntry>>({});
  const [searchTerm, setSearchTerm] = useState("");

  const vehicleTypes = ["Car", "Bike", "Truck", "Van", "Bus"];

  useEffect(() => {
    async function fetchData() {
      const mockData: VehicleEntry[] = [
        {
          id: 1,
          driverName: "John Doe",
          vehicleNo: "XYZ 1234",
          vehicleType: "Truck",
          entryTime: "10:30",
          exitTime: null,
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

  const handleExit = (id: number) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, exitTime: new Date().toLocaleTimeString() } : entry
      )
    );
    toast.success("Exit marked successfully!");
  };

  const handleEdit = (id: number) => {
    setEditingEntry(id);
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) setEditedData({ ...entryToEdit });
  };

  const handleSave = (id: number) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, ...editedData } : entry
      )
    );

    // Add the new reason to the list if it doesn't exist
    if (editedData.reason && !visitReasons.includes(editedData.reason)) {
      setVisitReasons([...visitReasons, editedData.reason]);
    }

    setEditingEntry(null);
    toast.success("Entry updated successfully!");
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
      toast.success("Entry deleted successfully!");
    }
  };

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
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell>
                  {editingEntry === entry.id ? (
                    <Input
                      value={editedData.driverName || ""}
                      onChange={(e) => setEditedData({ ...editedData, driverName: e.target.value })}
                    />
                  ) : (
                    <span className="font-semibold">{entry.driverName}</span>
                  )}
                </TableCell>

                <TableCell>
                  {editingEntry === entry.id ? (
                    <Input
                      value={editedData.vehicleNo || ""}
                      onChange={(e) => setEditedData({ ...editedData, vehicleNo: e.target.value })}
                    />
                  ) : (
                    entry.vehicleNo
                  )}
                </TableCell>

                <TableCell>
                  {editingEntry === entry.id ? (
                    <Select
                      value={editedData.vehicleType || entry.vehicleType}
                      onValueChange={(value) => setEditedData({ ...editedData, vehicleType: value })}
                    >
                      {vehicleTypes.map((type, index) => (
                        <SelectItem key={index} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    entry.vehicleType
                  )}
                </TableCell>

                <TableCell>{entry.entryTime}</TableCell>

                <TableCell>{entry.exitTime ? entry.exitTime : "N/A"}</TableCell>

                <TableCell>
                  {editingEntry === entry.id ? (
                    <>
                      <Input
                        placeholder="Search or add reason..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <Select
                        value={editedData.reason || entry.reason}
                        onValueChange={(value) => setEditedData({ ...editedData, reason: value })}
                      >
                        {visitReasons
                          .filter((r) =>
                            r.toLowerCase().includes(searchTerm.toLowerCase())
                          )
                          .map((reason, index) => (
                            <SelectItem key={index} value={reason}>
                              {reason}
                            </SelectItem>
                          ))}
                      </Select>
                    </>
                  ) : (
                    <Badge className="bg-blue-700 text-white">{entry.reason}</Badge>
                  )}
                </TableCell>

                <TableCell>
                  <Badge variant="secondary">{entry.department}</Badge>
                </TableCell>

                <TableCell>
                  {editingEntry === entry.id ? (
                    <Input
                      value={`${editedData.length || entry.length} × ${editedData.width || entry.width} × ${editedData.height || entry.height}`}
                      onChange={(e) => {
                        const [newLength, newWidth, newHeight] = e.target.value.split("×").map((val) => val.trim());
                        setEditedData({ ...editedData, length: newLength, width: newWidth, height: newHeight });
                      }}
                    />
                  ) : (
                    `${entry.length} × ${entry.width} × ${entry.height}`
                  )}
                </TableCell>

                <TableCell>
                  {editingEntry === entry.id ? (
                    <Button className="bg-green-500 text-white ml-2" onClick={() => handleSave(entry.id)}>
                      Save
                    </Button>
                  ) : (
                    <>
                      {!entry.exitTime ? (
                        <Button className="bg-red-500 text-white ml-2" onClick={() => handleExit(entry.id)}>
                          Mark Exit
                        </Button>
                      ) : (
                        <span className="text-green-500">Exited</span>
                      )}
                      <Button className="bg-yellow-500 text-white ml-2" onClick={() => handleEdit(entry.id)}>
                        Edit
                      </Button>
                      <Button className="bg-gray-500 text-white ml-2" onClick={() => handleDelete(entry.id)}>
                        Delete
                      </Button>
                    </>
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
