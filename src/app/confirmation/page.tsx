import { BookingConfirmation } from "@/components/confirmation/BookingConfirmation";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ConfirmationContent() {
    const searchParams = useSearchParams();
    const queryParams: {[key: string]: string} = {};
    for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value;
    }

    return <BookingConfirmation queryParams={queryParams} />;
}


export default function ConfirmationPage() {
    return (
        <div className="container py-8 md:py-12">
            <Suspense fallback={<div>Loading confirmation...</div>}>
                <ConfirmationContent />
            </Suspense>
        </div>
    );
}
