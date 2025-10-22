"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { carTypes } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { UploadCloud, ArrowRight } from "lucide-react";

const formSchema = z.object({
  carType: z.string().min(1, "Please select a car type."),
  carModel: z.string().optional(),
  carPhoto: z.any().optional(),
});

interface CarSelectionFormProps {
    queryParams: {
        location: string;
        type: string;
        price: string;
    }
}

export function CarSelectionForm({ queryParams }: CarSelectionFormProps) {
  const router = useRouter();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);

  const carUploadPlaceholder = PlaceHolderImages.find(
    (img) => img.id === "car-upload-placeholder"
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carType: "",
      carModel: "",
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setPhotoName(file.name);
      setPhotoPreview(URL.createObjectURL(file));
      form.setValue("carPhoto", file);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newQueryParams = new URLSearchParams({
        ...queryParams,
        carType: values.carType,
    });
    router.push(`/checkout?${newQueryParams.toString()}`);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>3. Add Your Car Details</CardTitle>
        <CardDescription>
          Let us know which car you'll be parking with us.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="carType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Type</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select car type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {carTypes.map((type) => (
                            <SelectItem key={type.id} value={type.name}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="carModel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Car Model</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Coming Soon"
                          {...field}
                          disabled
                        />
                      </FormControl>
                      <FormDescription>
                        Specific model selection will be available soon.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="carPhoto"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Upload Car Photo (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative flex justify-center items-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors">
                        <Input
                          id="carPhoto"
                          type="file"
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          accept="image/*"
                          onChange={handlePhotoChange}
                        />
                        {photoPreview ? (
                            <Image src={photoPreview} alt="Car preview" layout="fill" objectFit="cover" className="rounded-lg"/>
                        ) : carUploadPlaceholder && (
                            <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                                <UploadCloud className="w-10 h-10 mb-2" />
                                <p className="font-semibold">Click to upload</p>
                                <p className="text-xs">PNG, JPG or GIF</p>
                            </div>
                        )}
                      </div>
                    </FormControl>
                    <FormDescription>
                      {photoName || "A photo helps our team identify your vehicle."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit" size="lg">
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
