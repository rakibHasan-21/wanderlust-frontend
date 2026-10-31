"use client"
import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { CalendarPlus, CheckCircle, Pencil, RotateCcw, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = [
  { value: "beach", label: "Beach" },
  { value: "mountain", label: "Mountain" },
  { value: "cityTour", label: "City Tour" },
  { value: "adventure", label: "Adventure" },
];

type Destination = {
  _id: string;
  destinationName: string;
  country: string;
  category: string;
  price: string | number;
  duration: string | number;
  departureDate: string;
  imageUrl: string;
  description: string;
};

type EditDestinationProps = {
  data: Destination;
};

export default function EditDestination({ data }: EditDestinationProps) {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(data.category);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  function handleReset() {
    formRef.current?.reset();
    setCategory(data.category);
    setSubmitted(false);
  }

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);

    if (isOpen) {
      setCategory(data.category);
      setSubmitted(false);

      // Populate the form with the latest prop values.
      requestAnimationFrame(() => {
        if (!formRef.current) return;

        formRef.current.reset();

        const form = formRef.current;
        const setValue = (name: string, value: string | number) => {
          const field = form.elements.namedItem(name);

          if (
            field instanceof HTMLInputElement ||
            field instanceof HTMLTextAreaElement
          ) {
            field.value = String(value ?? "");
          }
        };

        setValue("destinationName", data.destinationName);
        setValue("country", data.country);
        setValue("price", data.price);
        setValue("duration", data.duration);
        setValue(
          "departureDate",
          data.departureDate ? data.departureDate.slice(0, 10) : "",
        );
        setValue("imageUrl", data.imageUrl);
        setValue("description", data.description);
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const updatedDestination = {
      ...Object.fromEntries(formData.entries()),
      category,
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/destination/${data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedDestination),
    });
    const Formdata = await res.json();

    console.log("Destination ID:", data._id);
    console.log("Updated destination:", Formdata);

    setSubmitted(true);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button variant="outline" className="gap-2">
            <Pencil className="size-4" />
            Edit
          </Button>
        }
      />

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update your destination details below.
          </DialogDescription>
        </DialogHeader>

        <form ref={formRef} className="grid gap-5" onSubmit={handleSubmit}>
          <FieldGroup className="gap-5">
            <Field>
              <Label htmlFor="destination-name">Destination Name</Label>
              <Input
                id="destination-name"
                name="destinationName"
                defaultValue={data.destinationName}
                placeholder="Bali Paradise"
                required
              />
            </Field>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  defaultValue={data.country}
                  placeholder="Indonesia"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  value={category}
                  onValueChange={(value) => setCategory(value ?? "")}
                  items={CATEGORIES}
                  required
                >
                  <SelectTrigger id="category" className="w-full">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {CATEGORIES.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <Field>
                <Label htmlFor="price">Price (USD)</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  defaultValue={data.price}
                  placeholder="1299"
                  required
                />
              </Field>

              <Field>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  name="duration"
                  defaultValue={data.duration}
                  placeholder="7"
                  required
                />
              </Field>
            </div>

            <Field>
              <Label htmlFor="departure-date">Departure Date</Label>
              <Input
                id="departure-date"
                name="departureDate"
                type="date"
                defaultValue={
                  data.departureDate ? data.departureDate.slice(0, 10) : ""
                }
                required
              />
            </Field>

            <Field>
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                name="imageUrl"
                type="url"
                defaultValue={data.imageUrl}
                placeholder="https://example.com/image.jpg"
                required
              />
            </Field>

            <Field>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                defaultValue={data.description}
                placeholder="Describe the travel experience..."
                className="min-h-24"
              />
            </Field>
          </FieldGroup>

          {submitted && (
            <p
              aria-live="polite"
              className="flex items-center gap-2 text-sm text-green-600"
            >
              <CheckCircle className="size-4" />
              Form submitted successfully.
            </p>
          )}

          <DialogFooter className="flex-col gap-2 sm:flex-row">
            <Button type="button" variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 size-4" />
              Reset
            </Button>

            <DialogClose
              render={
                <Button type="button" variant="outline">
                  <X className="mr-2 size-4" />
                  Close
                </Button>
              }
            />

            <Button type="submit">
              <CalendarPlus className="mr-2 size-4" />
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
