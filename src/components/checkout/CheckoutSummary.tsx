"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { parkingOptions, parkingLocations } from "@/lib/data";
import { MapPin, Calendar, Car, Tag } from "lucide-react";

interface CheckoutSummaryProps {
    queryParams: {
        location: string;
        type: string;
        price: string;
        carType: string;
    }
}

export function CheckoutSummary({ queryParams }: CheckoutSummaryProps) {

    const locationName = parkingLocations.find(l => l.id === queryParams.location)?.name || 'N/A';
    const parkingType = parkingOptions.find(p => p.id === queryParams.type)?.title || 'N/A';
    const price = queryParams.price || '0';

    const summaryItems = [
        { icon: MapPin, label: "Location", value: locationName },
        { icon: Calendar, label: "Parking Type", value: parkingType },
        { icon: Car, label: "Vehicle", value: queryParams.carType || "Not specified" },
        { icon: Tag, label: "Daily Rate", value: `R${parseFloat(price).toFixed(2)}` },
    ];

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
                <CardDescription>Please review your booking details below before proceeding to payment.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {summaryItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <item.icon className="h-5 w-5" />
                            <span className="text-sm">{item.label}</span>
                        </div>
                        <span className="font-semibold text-sm">{item.value}</span>
                    </div>
                ))}
                <Separator />
                <div className="flex items-center justify-between text-lg">
                     <span className="font-semibold">Total (per day)</span>
                     <span className="font-bold text-primary">R{parseFloat(price).toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground">This is a simulated price. No actual charges will be made.</p>
            </CardContent>
        </Card>
    );
}
