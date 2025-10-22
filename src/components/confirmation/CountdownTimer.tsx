"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Timer } from "lucide-react";

export function CountdownTimer({ initialMinutes = 15 }) {
  const [timeLeft, setTimeLeft] = useState(initialMinutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <Card className="bg-primary/10 border-primary/20">
        <CardContent className="p-4">
            <div className="flex items-center justify-center gap-4">
                <Timer className="h-8 w-8 text-primary" />
                <div className="text-center">
                    <p className="text-sm text-primary/80">Estimated time until ready</p>
                     <p className="text-2xl font-bold font-mono tracking-widest text-primary">
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
  );
}
