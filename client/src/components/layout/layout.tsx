
import React from "react";
import { CenteredContainer } from "./centered-container";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full">
      <CenteredContainer>
        {children}
      </CenteredContainer>
    </div>
  );
}
