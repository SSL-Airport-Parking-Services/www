"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, LogOut } from "lucide-react";
import { Logo } from "@/components/icons/Logo";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { isLoggedIn, userEmail, userName, logout } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);


  const handleLoginClick = () => {
    setIsModalOpen(true);
    setIsRedirecting(true); 
  };
  
  const handleLoginSuccess = () => {
    setIsModalOpen(false);
    if(isRedirecting) {
        router.push('/options');
        setIsRedirecting(false);
    }
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const NavLinks = () => (
    <>
      <Link
        href="/options"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Parking Options
      </Link>
      <Link
        href="/support"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Support
      </Link>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="flex items-center">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
            {isLoggedIn && <p className="hidden md:block text-sm font-medium animate-fade-in">Welcome, {userName}!</p>}
          </div>


          <div className="hidden flex-1 items-center justify-center space-x-4 md:flex">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <NavLinks />
            </nav>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${userEmail}.png`}
                        alt={userEmail}
                      />
                      <AvatarFallback>
                        {userName ? userName.charAt(0).toUpperCase() : ''}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {userName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {userEmail}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={handleLoginClick}
                className="hidden md:inline-flex"
              >
                Login / Sign Up
              </Button>
            )}

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex h-full flex-col justify-between p-6">
                  <div className="flex flex-col space-y-5">
                    <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo />
                    </Link>
                    {isLoggedIn && <p className="text-sm font-medium">Welcome, {userName}!</p>}
                    <NavLinks />
                  </div>
                  {!isLoggedIn && (
                    <Button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        handleLoginClick();
                      }}
                    >
                      Login / Sign Up
                    </Button>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}
