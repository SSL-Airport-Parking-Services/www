import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data";
import { Logo } from "@/components/icons/Logo";
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full border-t bg-card">
      <div className="container grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-3 md:px-6">
        <div className="flex flex-col items-start gap-4">
          <Link href="/">
            <Logo />
          </Link>
          <p className="text-sm text-muted-foreground">
            Your seamless airport parking experience.
          </p>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Parkway Booking. All rights reserved.
          </p>
        </div>
        <div className="md:col-span-2">
          <h3 className="mb-4 text-lg font-semibold">
            Frequently Asked Questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
           <div className="mt-6 text-sm">
            <p className="text-muted-foreground">
                Can't find your answer?{" "}
                <Link href="/support" className="font-medium text-primary hover:underline">
                    Contact our support team.
                </Link>
            </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
