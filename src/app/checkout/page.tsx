import { CheckoutSummary } from "@/components/checkout/CheckoutSummary";
import { PaymentOptions } from "@/components/checkout/PaymentOptions";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CheckoutContent() {
    const searchParams = useSearchParams();
    const queryParams: {[key: string]: string} = {};
    for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value;
    }
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-8">
                 <CheckoutSummary queryParams={queryParams} />
            </div>
            <div className="space-y-8">
                 <PaymentOptions queryParams={queryParams} />
            </div>
        </div>
    );
}


export default function CheckoutPage() {
    return (
        <div className="container py-8 md:py-12">
            <Suspense fallback={<div>Loading...</div>}>
                <CheckoutContent />
            </Suspense>
        </div>
    );
}
