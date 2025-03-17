import React from "react";
import { cn } from "../../lib/utils";

interface CenteredContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function CenteredContainer({ children, className }: CenteredContainerProps) {
  return (
    <div className={cn("w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", className)}>
      {children}
    </div>
  );
}