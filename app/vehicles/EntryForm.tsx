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

export default function VehiclesForm() {
  const [formData, setFormData] = useState({
    driverName: "",
    driverMobile: "",
    vehicleNo: "",
    vehicleType: "",
    entryTime: "",
    exitTime: "",
    reason: "",
    department: "",
    length: "",
    width: "",
    height: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (
      (name === "length" || name === "width" || name === "height") &&
      parseFloat(value) < 0
    )
      return;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);
    const trimmedForm = { name: formData.driverName, mobile: formData.driverMobile, vehicleNo: formData.vehicleNo};
    try {
      const response = await fetch("/api/vehicles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(trimmedForm),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Vehicle visit added successfully:", data);
        alert("Vehicle visit added successfully!");
      } else {
        const errorData = await response.json();
        console.error("Error adding vehicle visit:", errorData);
        alert(`Error: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <Card className="bg-[#251dc9] text-white">
      <CardHeader>
        <CardTitle>Vehicle Entry</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <Input
            name="driverName"
            placeholder="Driver Name"
            value={formData.driverName}
            onChange={handleChange}
            required
          />
          <Input
            name="vehicleNo"
            placeholder="Vehicle Number"
            value={formData.vehicleNo}
            onChange={handleChange}
            required
          />

          {/* Vehicle Type */}
          <Select
            onValueChange={(value) =>
              setFormData({ ...formData, vehicleType: value })
            }
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Vehicle Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Car">Car</SelectItem>
              <SelectItem value="Truck">Truck</SelectItem>
              <SelectItem value="Bike">Bike</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Input
            name="driverMobile"
            placeholder="Drive Mobile"
            value={formData.driverMobile}
            onChange={handleChange}
            required
          />

          <Input
            type="time"
            name="entryTime"
            value={formData.entryTime}
            onChange={handleChange}
            required
          />
          <Input
            type="time"
            name="exitTime"
            value={formData.exitTime}
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
              <SelectItem value="Delivery">Delivery</SelectItem>
              <SelectItem value="Event">Event</SelectItem>
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

          <Input
            type="number"
            name="length"
            placeholder="Vehicle Length (m)"
            value={formData.length}
            onChange={handleChange}
            min="0"
            required
          />
          <Input
            type="number"
            name="width"
            placeholder="Vehicle Width (m)"
            value={formData.width}
            onChange={handleChange}
            min="0"
            required
          />
          <Input
            type="number"
            name="height"
            placeholder="Vehicle Height (m)"
            value={formData.height}
            onChange={handleChange}
            min="0"
            required
          />

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
