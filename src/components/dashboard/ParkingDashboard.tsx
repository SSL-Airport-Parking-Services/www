"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parkingOptions, parkingLocations } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Car, CheckCircle2, Plane, CalendarDays, MapPin } from "lucide-react";
import { AuthModal } from "@/components/auth/AuthModal";

const ICONS: { [key: string]: React.ElementType } = {
  Plane,
  CalendarDays,
  Car,
};

export function ParkingDashboard() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState(
    parkingLocations[0].id
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedOptionForRedirect, setSelectedOptionForRedirect] = useState<{
    pathname: string;
    query: { location: string; type: string; price: string };
  } | null>(null);

  const mapPlaceholder = PlaceHolderImages.find(
    (img) => img.id === "map-placeholder"
  );

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
  };

  const handleSelectOption = (option: typeof parkingOptions[0]) => {
    const redirectDetails = {
      pathname: "/car-selection",
      query: {
        location: selectedLocation,
        type: option.id,
        price: String(option.price),
      },
    };

    if (isLoggedIn) {
      const params = new URLSearchParams(redirectDetails.query as any);
      router.push(`${redirectDetails.pathname}?${params.toString()}`);
    } else {
      setSelectedOptionForRedirect(redirectDetails);
      setIsModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsModalOpen(false);
    if (selectedOptionForRedirect) {
      const params = new URLSearchParams(selectedOptionForRedirect.query as any);
      router.push(`${selectedOptionForRedirect.pathname}?${params.toString()}`);
      setSelectedOptionForRedirect(null); 
    }
  };

  const selectedLocationName = parkingLocations.find(
    (loc) => loc.id === selectedLocation
  )?.name;

  return (
    <>
      <div className="space-y-12 animate-fade-in">
        <section className="text-center animate-slide-in-from-bottom">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            Our Parking Solutions
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mt-4">
            Choose a location and the package that fits your travel needs.
          </p>
        </section>

        <Card className="shadow-lg animate-slide-in-from-bottom" style={{animationDelay: '150ms'}}>
          <CardHeader>
            <CardTitle>1. Choose Your Parking Location</CardTitle>
            <CardDescription>
              Select your departure airport to see available parking options.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <Select
                onValueChange={handleLocationChange}
                defaultValue={selectedLocation}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a location" />
                </SelectTrigger>
                <SelectContent>
                  {parkingLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                {mapPlaceholder && (
                  <Image
                    src={mapPlaceholder.imageUrl}
                    alt={mapPlaceholder.description}
                    fill
                    className="object-cover"
                    data-ai-hint={mapPlaceholder.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">
                      {selectedLocationName}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold mb-2">Pricing Overview</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Option</TableHead>
                      <TableHead>Best For</TableHead>
                      <TableHead className="text-right">Daily Rate</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {parkingOptions.map((option) => (
                      <TableRow key={option.id}>
                        <TableCell className="font-medium">
                          {option.title}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {option.bestFor}
                        </TableCell>
                        <TableCell className="text-right">
                          R {option.price.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                * Prices are estimates and may vary. All prices in ZAR.
              </p>
            </div>
          </CardContent>
        </Card>

        <section className="space-y-6">
          <div className="text-center animate-slide-in-from-bottom" style={{animationDelay: '300ms'}}>
            <h2 className="text-3xl font-bold tracking-tighter font-headline">
              2. Select Your Parking Type
            </h2>
            <p className="text-muted-foreground mt-2">
              Choose the option that best fits your travel needs. Login may be
              required to proceed.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {parkingOptions.map((option, index) => {
              const Icon = ICONS[option.icon];
              return (
                <Card
                  key={option.id}
                  className="flex flex-col transition-all hover:shadow-xl hover:-translate-y-1 animate-slide-in-from-bottom"
                  style={{animationDelay: `${450 + index * 150}ms`}}
                >
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <Icon className="h-10 w-10 text-primary" />
                      <CardTitle>{option.title}</CardTitle>
                    </div>
                    <CardDescription>{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-4xl font-bold">
                      R{option.price}
                      <span className="text-sm font-normal text-muted-foreground">
                        /day
                      </span>
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => handleSelectOption(option)}
                      className="w-full"
                      size="lg"
                    >
                      Select & Continue <CheckCircle2 className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </section>
      </div>
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
