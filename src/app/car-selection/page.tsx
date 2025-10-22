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
    
    // This is a placeholder for a real auth check
    const isLoggedIn = true; // In a real app, this would come from a context or auth hook

    if (!isLoggedIn) {
        // You can redirect to login or show a message
        // For now, we're assuming the user gets here after logging in as per the updated flow.
        // A more robust solution would use middleware or a HOC for protected routes.
    }
    
    return <CarSelectionForm queryParams={queryParams} />;
}


export default function CarSelectionPage() {
    return (
        <div className="container py-8 md:py-12 animate-fade-in">
            <Suspense fallback={<div>Loading...</div>}>
                <CarSelectionContent />
            </Suspense>
        </div>
    );
}
