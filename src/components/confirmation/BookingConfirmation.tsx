"use client"

import { useState } from "react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { CountdownTimer } from "@/components/confirmation/CountdownTimer";
import { CheckCircle, Bell, LifeBuoy } from "lucide-react";
import { parkingOptions, parkingLocations } from "@/lib/data";

interface BookingConfirmationProps {
    queryParams: {
        location: string;
        type: string;
        price: string;
        carType: string;
    }
}

export function BookingConfirmation({ queryParams }: BookingConfirmationProps) {
    const { toast } = useToast();
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const locationName = parkingLocations.find(l => l.id === queryParams.location)?.name || 'N/A';
    const parkingType = parkingOptions.find(p => p.id === queryParams.type)?.title || 'N/A';
    const carType = queryParams.carType || 'N/A';
    const bookingId = Math.random().toString(36).substring(2, 9).toUpperCase();

    const handleNotificationRequest = () => {
        toast({
            title: "Notifications Enabled",
            description: "You'll receive updates on your booking status.",
        });
        setNotificationEnabled(true);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                <p className="text-muted-foreground">
                    Your parking spot is reserved. Your booking ID is <span className="font-mono text-primary">{bookingId}</span>.
                </p>
            </div>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle>Your Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex justify-between"><span className="text-muted-foreground">Location:</span> <span className="font-semibold">{locationName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Parking Type:</span> <span className="font-semibold">{parkingType}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Vehicle:</span> <span className="font-semibold">{carType}</span></div>
                </CardContent>
            </Card>

            <CountdownTimer />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleNotificationRequest} disabled={notificationEnabled}>
                    <Bell className="mr-2 h-4 w-4" />
                    {notificationEnabled ? 'Notifications Enabled' : 'Get Status Updates'}
                </Button>
                <Button asChild variant="secondary">
                    <Link href="/support">
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        Contact Support
                    </Link>
                </Button>
            </div>

             <div className="text-center">
                <Button asChild>
                    <Link href="/">Book Another Spot</Link>
                </Button>
            </div>
        </div>
    );
}
