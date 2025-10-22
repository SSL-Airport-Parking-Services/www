"use client";

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { BookingConfirmation } from "@/components/confirmation/BookingConfirmation";
import { Suspense } from 'react';

function ConfirmationContent() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!isLoggedIn) {
            router.push('/options');
        }
    }, [isLoggedIn, router]);

    const queryParams: {[key: string]: string} = {};
    for (const [key, value] of searchParams.entries()) {
        queryParams[key] = value;
    }

    if (!isLoggedIn) {
        return (
            <div className="container py-8 md:py-12 text-center">
                <p>Redirecting...</p>
            </div>
        )
    }

    return <BookingConfirmation queryParams={queryParams} />;
}


export default function ConfirmationPage() {
    return (
        <div className="container py-8 md:py-12">
            <Suspense fallback={<div className="text-center">Loading confirmation...</div>}>
                <ConfirmationContent />
            </Suspense>
        </div>
    );
}
