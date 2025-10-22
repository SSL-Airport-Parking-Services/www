"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CarSelectionForm } from "@/components/car-selection/CarSelectionForm";
import { Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';

function CarSelectionContent() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/options');
        }
    }, [isLoggedIn, router]);


    const queryParams = {
        location: searchParams.get('location') || '',
        type: searchParams.get('type') || '',
        price: searchParams.get('price') || '',
    };
    
    if (!isLoggedIn) {
        return (
             <div className="container py-8 md:py-12 text-center">
                <p>Redirecting to login...</p>
            </div>
        );
    }
    
    return <CarSelectionForm queryParams={queryParams} />;
}


export default function CarSelectionPage() {
    return (
        <div className="container py-8 md:py-12 animate-fade-in">
            <Suspense fallback={<div className="text-center">Loading...</div>}>
                <CarSelectionContent />
            </Suspense>
        </div>
    );
}
