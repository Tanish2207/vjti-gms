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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  const [visitReasons, setVisitReasons] = useState<string[]>([
    "Fest Promotion",
    "Delivery",
    "Meeting",
  ]);
  const [editingEntry, setEditingEntry] = useState<number | null>(null);
  const [editedData, setEditedData] = useState<Partial<Entry>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setEntries([]);
      setLoading(true);
      try {
        const response = await fetch(`/api/humans?term=${encodeURIComponent(searchTerm)}`);
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
          outTime: entry.get_exit ? new Date(entry.get_exit).toLocaleTimeString() : "N/A",
          reason: "Unknown",
          department: "General",
        }));

        toast.success("Data fetched successfully!");
        setEntries(formattedEntries);
      } catch (error) {
        toast.error(error ? `${error}` : "Error fetching data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [searchTerm]);

  const handleExit = (id: number) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, outTime: new Date().toLocaleTimeString() } : entry
      )
    );
  };

  const handleEdit = (id: number) => {
    setEditingEntry(id);
    const entryToEdit = entries.find((entry) => entry.id === id);
    if (entryToEdit) {
      setEditedData({ ...entryToEdit });
    }
  };

  const handleSave = (id: number) => {
    const reason = editedData.reason?.trim();
    if (reason && !visitReasons.includes(reason)) {
      setVisitReasons((prev) => [...prev, reason]);
    }

    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, ...editedData } : entry
      )
    );
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
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            {entries.length ? (
              <TableBody>
                {entries.map((entry) => (
                  <TableRow key={entry.id}>
                    <TableCell>
                      {editingEntry === entry.id ? (
                        <Input
                          value={editedData.name || ""}
                          onChange={(e) =>
                            setEditedData({ ...editedData, name: e.target.value })
                          }
                        />
                      ) : (
                        <span className="font-semibold">{entry.name}</span>
                      )}
                    </TableCell>

                    <TableCell>
                      {editingEntry === entry.id ? (
                        <Input
                          value={editedData.mobile || ""}
                          onChange={(e) =>
                            setEditedData({ ...editedData, mobile: e.target.value })
                          }
                        />
                      ) : (
                        entry.mobile
                      )}
                    </TableCell>

                    <TableCell>{entry.inTime}</TableCell>
                    <TableCell>{entry.outTime || "Not Exited"}</TableCell>

                    <TableCell>
                      {editingEntry === entry.id ? (
                        <div className="relative">
                          <Input
                            value={editedData.reason || ""}
                            placeholder="Search or enter reason"
                            onChange={(e) =>
                              setEditedData({ ...editedData, reason: e.target.value })
                            }
                          />
                          {(editedData.reason || "").trim() !== "" && (
                            <div className="absolute z-10 bg-white border mt-1 rounded shadow w-full max-h-40 overflow-auto">
                              {visitReasons
                                .filter((r) =>
                                  r
                                    .toLowerCase()
                                    .includes(
                                      (editedData.reason || "").toLowerCase()
                                    )
                                )
                                .map((filteredReason, index) => (
                                  <div
                                    key={index}
                                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                    onClick={() =>
                                      setEditedData({
                                        ...editedData,
                                        reason: filteredReason,
                                      })
                                    }
                                  >
                                    {filteredReason}
                                  </div>
                                ))}

                              {!visitReasons.some(
                                (r) =>
                                  r.toLowerCase() ===
                                  (editedData.reason || "").toLowerCase()
                              ) && (
                                <div
                                  className="px-3 py-1 hover:bg-green-100 cursor-pointer text-green-700 font-semibold"
                                  onClick={() => {
                                    const newReason =
                                      editedData.reason?.trim();
                                    if (newReason) {
                                      setVisitReasons([
                                        ...visitReasons,
                                        newReason,
                                      ]);
                                      setEditedData({
                                        ...editedData,
                                        reason: newReason,
                                      });
                                    }
                                  }}
                                >
                                  ➕ Add &quot;{editedData.reason}&quot;
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Badge className="bg-blue-700 text-white">{entry.reason}</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {editingEntry === entry.id ? (
                        <Input
                          value={editedData.department || ""}
                          onChange={(e) =>
                            setEditedData({
                              ...editedData,
                              department: e.target.value,
                            })
                          }
                        />
                      ) : (
                        <Badge variant="secondary">{entry.department}</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {!entry.outTime ? (
                        <Badge
                          className="bg-red-500 text-white cursor-pointer hover:bg-[#2d2d2d]"
                          onClick={() => handleExit(entry.id)}
                        >
                          Mark Exit
                        </Badge>
                      ) : (
                        <span className="text-green-500">Exited</span>
                      )}

                      {editingEntry === entry.id ? (
                        <Button
                          className="bg-green-500 text-white ml-2 px-3 py-1"
                          onClick={() => handleSave(entry.id)}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button
                          className="bg-yellow-500 text-white ml-2 px-3 py-1"
                          onClick={() => handleEdit(entry.id)}
                        >
                          Edit
                        </Button>
                      )}

                      <Button
                        className="bg-gray-500 text-white ml-2 px-3 py-1"
                        onClick={() => handleDelete(entry.id)}
                      >
                        Delete
                      </Button>
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
