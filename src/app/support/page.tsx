import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquareDashed, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SupportPage() {
  return (
    <div className="container flex min-h-[60vh] items-center justify-center py-12">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <MessageSquareDashed className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">Live Chat Coming Soon</CardTitle>
          <CardDescription>
            Our live support feature is currently under construction. We're working hard to bring it to you!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-6">
            In the meantime, you can find answers to common questions in our FAQ section on the home page.
          </p>
          <Button asChild>
            <Link href="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Go Back Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
