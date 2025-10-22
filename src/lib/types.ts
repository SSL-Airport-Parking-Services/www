import type { LucideIcon } from "lucide-react";

export interface ParkingOption {
    id: string;
    title: string;
    description: string;
    price: number;
    icon: any;
    bestFor: string;
}

export interface Car {
    id: string;
    name: string;
}

export interface Faq {
    question: string;
    answer: string;
}
