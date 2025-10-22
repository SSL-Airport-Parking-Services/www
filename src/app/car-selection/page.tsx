"use client";

import { CarSelectionForm } from "@/components/car-selection/CarSelectionForm";
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CarSelectionContent() {
    const searchParams = useSearchParams();
    const queryParams = {
        location: searchParams.get('location') || '',
        type: searchParams.get('type') || '',
        price: searchParams.get('price') || '',
    };
    
    return <CarSelectionForm queryParams={queryParams} />;
}


export default function CarSelectionPage() {
    return (
        <div className="container py-8 md:py-12">
            <Suspense fallback={<div>Loading...</div>}>
                <CarSelectionContent />
            </Suspense>
        </div>
    );
}
