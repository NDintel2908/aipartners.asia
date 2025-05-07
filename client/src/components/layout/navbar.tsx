import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import logo from "./logo.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "AI Builders", href: "/aibuilders" },
  { label: "AI Trainers", href: "/ai-trainers" },
  { label: "AI Workforce", href: "/ai-workforce" },
  { label: "AI Agents Market", href: "/ai-store" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur-lg supports-[backdrop-filter]:bg-white/80">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          <nav className="flex items-center space-x-6 text-sm text-gray-600">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-all duration-200 hover:text-black hover:scale-105",
                  location === item.href ? "text-black font-semibold" : ""
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:block ml-6">
            <Link href="/contact">
              <Button variant="default" className="shadow-sm hover:shadow-md transition-shadow">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-background">
            <div className="flex flex-col space-y-4 mt-8 text-foreground">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-lg transition-colors hover:text-gray-300",
                    location === item.href ? "text-foreground font-bold" : "text-foreground"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
        </div>
      </div>
    </nav>
  );
}