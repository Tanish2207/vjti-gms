"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

export default function VisitorsForm({ onEntryAdded }: { onEntryAdded: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    extraPeople: "+0",
    time: "",
    exitTime: "",
    reason: "",
    department: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/humans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          mobile: formData.mobile,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit visitor data");
      }
      toast.success("Visitor entry recorded successfully!");
      setFormData({
        name: "",
        mobile: "",
        extraPeople: "+0",
        time: "",
        exitTime: "",
        reason: "",
        department: "",
      });

      onEntryAdded(); // Refresh table after submission
    } catch {
      toast.error("Failed to submit visitor entry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full bg-[#251dc9] text-white">
      <CardHeader>
        <CardTitle>Human Visitor Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input name="name" placeholder="Name" className="placeholder:text-gray-300" value={formData.name} onChange={handleChange} required />
          <Input type="tel" name="mobile" placeholder="Mobile No." className="placeholder:text-gray-300" value={formData.mobile} onChange={handleChange} required />

          <Input
            type="text"
            name="extraPeople"
            placeholder="+1"
            className="placeholder:text-gray-300"
            value={formData.extraPeople}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\+\d*$/.test(value)) {
                setFormData({ ...formData, extraPeople: value });
              }
            }}
            required
          />

          <Input type="time" name="time" className="placeholder:text-gray-300" value={formData.time} onChange={handleChange} required />
          <Input type="time" name="exitTime" className="placeholder:text-gray-300" value={formData.exitTime} onChange={handleChange} />

          <Select onValueChange={(value) => setFormData({ ...formData, reason: value })}>
            <SelectTrigger className="placeholder:text-gray-300">
              <SelectValue placeholder="Select Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Fest Promotion">Fest Promotion</SelectItem>
              <SelectItem value="Delivery">Delivery</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
            <SelectTrigger className="placeholder:text-gray-300">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IT">IT</SelectItem>
              <SelectItem value="CSE">CSE</SelectItem>
              <SelectItem value="Mechanical">Mechanical</SelectItem>
              <SelectItem value="Electronics">Electronics</SelectItem>
              <SelectItem value="All">All</SelectItem>
            </SelectContent>
          </Select>

          <Button type="submit" disabled={loading} className="col-span-2 bg-white text-blue-700 hover:bg-gray-200">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
