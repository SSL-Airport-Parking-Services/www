import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Check, Star, Users, Briefcase, Car } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const testimonials = [
  {
    name: "Hamzah M.",
    role: "Frequent Flyer",
    quote: "SSL Airport Parking has been a game-changer for my business trips. The valet service is worth every penny. So convenient!",
    avatar: "https://avatar.vercel.sh/HM.png",
  },
  {
    name: "Samuel U.",
    role: "Family Vacationer",
    quote: "We used the long-stay option for our two-week holiday. The peace of mind knowing our car was secure was priceless. The shuttle was quick too!",
    avatar: "https://avatar.vercel.sh/SU.png",
  },
  {
    name: "SSL",
    role: "The Team",
    quote: "Super easy to book online. The short-stay parking is so close to the terminal. I was checked in within minutes of parking.",
    avatar: "https://avatar.vercel.sh/SSL.png",
  },
];

const stats = [
    { value: "50,000+", label: "Happy Travelers Served", icon: Users },
    { value: "12,000+", label: "5-Star Reviews", icon: Star },
    { value: "99.9%", label: "Vehicle Safety Record", icon: Check },
    { value: "1M+", label: "Holidays Made Easier", icon: Briefcase },
]

export default function Home() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'car-upload-placeholder');
  return (
    <div className="flex flex-col animate-fade-in">
        <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center text-white">
            {heroImage && 
                <Image 
                    src={heroImage.imageUrl} 
                    alt="Airport parking" 
                    fill
                    className="object-cover"
                    priority
                />
            }
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 p-4 space-y-4 animate-slide-in-from-bottom">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tighter !leading-tight">
                    Your Journey Begins with Peace of Mind
                </h1>
                <p className="max-w-2xl mx-auto text-lg md:text-xl text-neutral-300">
                    SSL Airport Parking offers secure, reliable, and convenient parking solutions so you can focus on your trip, not your car.
                </p>
                <Button asChild size="lg" className="mt-4">
                    <Link href="/options">View Parking Options</Link>
                </Button>
            </div>
        </section>

        <section className="bg-background/50 py-12 md:py-20">
            <div className="container">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={stat.label} className="flex flex-col items-center animate-fade-in" style={{animationDelay: `${index * 150}ms`}}>
                                <Icon className="h-10 w-10 text-primary mb-2"/>
                                <p className="text-2xl md:text-3xl font-bold">{stat.value}</p>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>

        <section className="py-12 md:py-20">
            <div className="container text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 animate-slide-in-from-bottom">Why Travelers Trust Us</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card key={testimonial.name} className="text-left animate-slide-in-from-bottom bg-card/50 border-border/20" style={{animationDelay: `${index * 200}ms`}}>
                            <CardContent className="pt-6">
                                <div className="flex items-start gap-4">
                                    <Image src={testimonial.avatar} alt={testimonial.name} width={48} height={48} className="rounded-full"/>
                                    <div>
                                        <p className="font-semibold">{testimonial.name}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                                <p className="mt-4 italic text-muted-foreground">"{testimonial.quote}"</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

         <section className="bg-primary/10 text-primary-foreground py-12 md:py-20">
            <div className="container text-center animate-fade-in">
                <h2 className="text-3xl md:text-4xl font-bold">Ready for a seamless trip?</h2>
                <p className="mt-2 text-lg opacity-90">Book your secure parking spot today.</p>
                <Button asChild size="lg" className="mt-6">
                    <Link href="/options">
                        <Car className="mr-2 h-5 w-5"/>
                        Let's Get Started
                    </Link>
                </Button>
            </div>
        </section>
    </div>
  );
}
