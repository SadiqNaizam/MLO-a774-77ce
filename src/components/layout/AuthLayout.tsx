import React from 'react';
import { cn } from '@/lib/utils';

interface AuthLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex items-center justify-center h-screen bg-background',
        className
      )}
    >
      {/* 
        The children (e.g., LoginForm component) will be rendered here.
        The LoginForm, as seen in the provided context code (LoginForm.tsx),
        is expected to be a Card component that handles its own styling,
        sizing (min-width, max-width), and internal padding.
        This AuthLayout component provides the full-screen centering container.
      */}
      {children}
    </div>
  );
};

export default AuthLayout;
