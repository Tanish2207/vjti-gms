"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import "@/app/globals.css";

export default function EntryForm() {
  const [formData, setFormData] = useState({
    personName: "",
    keyType: "",
    issueTime: "",
    returnTime: "",
    reason: "",
    department: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.issueTime &&
      formData.returnTime &&
      formData.returnTime <= formData.issueTime
    ) {
      alert("Return time must be later than issue time.");
      return;
    }
    console.log("🔑 Key Entry Submitted:", formData);
  };

  return (
    <Card className="bg-[#251dc9] text-white">
      <CardHeader>
        <CardTitle>Key Issue Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          {/* Person Name */}
          <Input
            name="personName"
            placeholder="Person Name"
            value={formData.personName}
            onChange={handleChange}
            required
          />

          {/* Key Type */}
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, keyType: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Key Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Room Key">Room Key</SelectItem>
              <SelectItem value="Locker Key">Locker Key</SelectItem>
              <SelectItem value="Cabinet Key">Cabinet Key</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Issue & Return Time */}
          <Input
            type="time"
            name="issueTime"
            value={formData.issueTime}
            onChange={handleChange}
            required
          />
          <Input
            type="time"
            name="returnTime"
            value={formData.returnTime}
            onChange={handleChange}
            required
          />

          {/* Reason */}
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, reason: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Maintenance">Maintenance</SelectItem>
              <SelectItem value="Meeting">Meeting</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* Department */}
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, department: value })
            }
            required
          >
            <SelectTrigger>
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

          {/* Submit Button */}
          <Button
            type="submit"
            className="col-span-2 bg-white text-blue-700 hover:bg-gray-200"
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
