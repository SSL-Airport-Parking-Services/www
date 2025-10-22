"use client"

import { useState } from "react";
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
        licensePlate: string;
    }
}

export function BookingConfirmation({ queryParams }: BookingConfirmationProps) {
    const { toast } = useToast();
    const [notificationEnabled, setNotificationEnabled] = useState(false);

    const locationName = parkingLocations.find(l => l.id === queryParams.location)?.name || 'N/A';
    const parkingType = parkingOptions.find(p => p.id === queryParams.type)?.title || 'N/A';
    const carType = queryParams.carType || 'N/A';
    const licensePlate = queryParams.licensePlate || 'N/A';
    const bookingId = Math.random().toString(36).substring(2, 9).toUpperCase();

    const handleNotificationRequest = () => {
        toast({
            title: "Notifications Enabled",
            description: "You'll receive updates on your booking status.",
        });
        setNotificationEnabled(true);
    };

    return (
        <div className="w-full max-w-2xl mx-auto space-y-8 animate-fade-in">
            <div className="text-center space-y-2 animate-slide-in-from-bottom">
                <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
                <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
                <p className="text-muted-foreground">
                    Your parking spot is reserved. Your booking ID is <span className="font-mono text-primary">{bookingId}</span>.
                </p>
            </div>

            <Card className="shadow-lg animate-slide-in-from-bottom" style={{animationDelay: '150ms'}}>
                <CardHeader>
                    <CardTitle>Your Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Location:</span> <span className="font-semibold">{locationName}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Parking Type:</span> <span className="font-semibold">{parkingType}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Vehicle:</span> <span className="font-semibold">{carType}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">License Plate:</span> <span className="font-semibold">{licensePlate}</span></div>
                </CardContent>
            </Card>

            <div className="animate-slide-in-from-bottom" style={{animationDelay: '300ms'}}>
                <CountdownTimer />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-in-from-bottom" style={{animationDelay: '450ms'}}>
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

             <div className="text-center animate-fade-in" style={{animationDelay: '600ms'}}>
                <Button asChild>
                    <Link href="/options">Book Another Spot</Link>
                </Button>
            </div>
        </div>
    );
}
