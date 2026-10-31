"use client";

import { useRef, useState } from "react";
import { AppWindowMacIcon, CalendarPlusIcon, CircleCheckIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { authClient } from "@/lib/auth-client";
import TokenClient from "@/lib/TokenClient";

const CATEGORIES = {
  beach: "Beach",
  mountain: "Mountain",
  adventure: "Adventure",
  cultural: "Cultural",
  honeymoon: "Honeymoon",
  wildlife: "Wildlife",
  cityTour: "City Tour",
  cruise: "Cruise",
} as const;

const AddDestination = () => {
  const [category, setCategory] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleReset = () => {
    setCategory(null);
    setSubmitted(false);
    formRef.current?.reset();
  };

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const AllData = Object.fromEntries(formData.entries());

  try {
    const token = await TokenClient();

    if (!token) {
      console.log("Token not found!");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/add-destination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(AllData),
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const result = await res.json();

    console.log("Success:", result);

    setSubmitted(true);
    formRef.current?.reset();
    setCategory(null);
  } catch (error) {
    console.log("Error:", error);
  }
};

  return (
    <section className="bg-muted">
      <div className="mx-auto w-full px-4 py-10 sm:px-10 md:py-14">
        <h1 className="font-heading text-4xl font-medium tracking-tight md:text-5xl">
          Add New Travel Package
        </h1>

        <Card className="mx-auto mt-8 w-full max-w-xl p-6 sm:mt-10 sm:p-8">
          <form ref={formRef} className="grid gap-5" onSubmit={handleSubmit}>
            <div className="grid gap-1.5">
              <Label htmlFor="destination-name">Destination Name</Label>
              <Input
                id="destination-name"
                name="destinationName"
                placeholder="Bali Paradise"
                className="bg-muted"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  placeholder="Indonesia"
                  className="bg-muted"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  required
                  value={category}
                  onValueChange={(value) => setCategory(value ?? null)}
                  items={CATEGORIES}
                >
                  <SelectTrigger id="category" className="w-full bg-muted">
                    <SelectValue placeholder="Beach" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(CATEGORIES).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-1.5">
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  placeholder="e.g. 1299"
                  className="bg-muted"
                  required
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  placeholder="e.g. 7 Days/6 Nights"
                  className="bg-muted"
                  required
                />
              </div>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="departure-date">Departure Date</Label>
              <Input
                id="departure-date"
                name="departureDate"
                type="date"
                className="bg-muted"
                required
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                name="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                className="bg-muted"
                required
              />
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Describe the travel experience..."
                className="min-h-24 bg-muted"
              />
            </div>

            <div className="flex min-h-9 flex-wrap items-center justify-end gap-3 pt-1">
              {submitted && (
                <p
                  aria-live="polite"
                  className="mr-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary"
                >
                  <CircleCheckIcon className="size-4" />
                  Travel package added successfully
                </p>
              )}
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="border-destructive/60 text-destructive hover:bg-destructive/10 hover:text-destructive"
                onClick={handleReset}
              >
                <Trash2Icon data-icon="inline-start" />
                Cancel
              </Button>
              <Button type="submit" size="lg">
                <CalendarPlusIcon data-icon="inline-start" />
                Add Travel Package
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default AddDestination;
