"use client"

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard, Lock } from "lucide-react";

interface PaymentOptionsProps {
    queryParams: {
        [key: string]: string;
    }
}

export function PaymentOptions({ queryParams }: PaymentOptionsProps) {
    const router = useRouter();

    const handleContinue = () => {
        const newQueryParams = new URLSearchParams(queryParams);
        router.push(`/confirmation?${newQueryParams.toString()}`);
    }

    const VisaIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" fill="none">
            <rect width="38" height="24" rx="4" fill="#142688"/>
            <path d="M22.6595 16.0312H25.031L22.953 8.16333H20.697L18.619 16.0312H20.9905L21.213 15.3195H22.436L22.6595 16.0312ZM21.8245 10.0331L22.56 12.7845H21.089L21.8245 10.0331Z" fill="white"/>
            <path d="M29.9885 8.16333C29.4245 8.16333 28.9823 8.35133 28.6618 8.72733L29.6235 12.3168C29.9235 12.0168 30.2235 11.8668 30.5235 11.8668C30.9525 11.8668 31.185 12.1158 31.185 12.5568C31.185 13.0698 30.8145 13.3398 30.012 13.7358C29.21 14.1318 28.8095 14.6598 28.8095 15.3198C28.8095 16.0308 29.4345 16.2048 30.075 16.2048C30.735 16.2048 31.1145 15.9348 31.3995 15.7038L31.623 16.0108C31.293 16.1458 30.7445 16.2258 30.2115 16.2258C29.0715 16.2258 28.029 15.7368 28.029 14.5458C28.029 13.4358 28.882 12.8298 30.1545 12.1698C30.9885 11.7168 31.4295 11.2398 31.4295 10.5198C31.4295 9.54783 30.755 9.21183 29.9885 9.21183L29.9885 8.16333Z" fill="white"/>
            <path d="M12.9231 16.0312L15.3526 8.16333H12.9121L11.7091 12.4488L11.5976 12.4278C11.1376 11.5818 10.1551 11.2108 9.38863 11.2108C7.59763 11.2108 6.99313 12.4598 6.99313 13.8888C6.99313 15.6588 7.82563 16.2258 8.87863 16.2258C9.64513 16.2258 10.2381 15.7488 10.5896 15.2868L10.7491 15.9688L12.9231 16.0312ZM9.30313 12.3058C10.0486 12.3058 10.5681 12.8618 10.5681 13.9108C10.5681 14.8098 10.0801 15.1508 9.37763 15.1508C8.61113 15.1508 8.23063 14.6178 8.23063 13.8408C8.23063 13.0638 8.64263 12.3058 9.30313 12.3058Z" fill="white"/>
        </svg>
    );

    const MastercardIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" fill="none">
            <rect width="38" height="24" rx="4" fill="#EB001B"/>
            <circle cx="27" cy="12" r="7" fill="#F79E1B"/>
            <path d="M18 12C18 15.866 14.866 19 11 19C7.13401 19 4 15.866 4 12C4 8.13401 7.13401 5 11 5C14.866 5 18 8.13401 18 12Z" fill="#FF5F00"/>
        </svg>
    );

    return (
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle>4. Payment Simulation</CardTitle>
                <CardDescription>No real payment is required for this demonstration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <RadioGroup defaultValue="admin-card" className="space-y-4">
                    <Label>
                        <div className="flex items-center gap-3 rounded-md border p-3 has-[:checked]:border-primary">
                            <RadioGroupItem value="admin-card" id="admin-card" />
                            <div className="flex-1">
                                <p className="font-semibold">Master Admin Card</p>
                                <p className="text-sm text-muted-foreground">Use the demo card to complete booking.</p>
                            </div>
                            <CreditCard className="h-6 w-6 text-muted-foreground"/>
                        </div>
                    </Label>
                    <Label>
                        <div className="flex items-center gap-3 rounded-md border p-3 has-[:checked]:border-primary opacity-50 cursor-not-allowed">
                            <RadioGroupItem value="card" id="card" disabled/>
                            <div className="flex-1">
                                <p className="font-semibold">Credit/Debit Card</p>
                                <p className="text-sm text-muted-foreground">Pay with Visa or Mastercard.</p>
                            </div>
                            <div className="flex gap-2">
                                <VisaIcon />
                                <MastercardIcon />
                            </div>
                        </div>
                    </Label>
                </RadioGroup>
                <Button onClick={handleContinue} className="w-full" size="lg">
                    <Lock className="mr-2 h-4 w-4" />
                    Complete Booking
                </Button>
            </CardContent>
        </Card>
    );
}
