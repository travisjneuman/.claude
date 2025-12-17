// Modern Card Component with Multiple Variants
// Copy and customize this component for your Next.js project

import React from 'react';
import { cn } from '@/lib/utils'; // or use your utility function

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'bordered' | 'elevated' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', padding = 'md', children, ...props }, ref) => {
    const baseStyles = 'rounded-xl bg-white transition-all duration-200';

    const variants = {
      default: 'shadow-sm',
      bordered: 'border-2 border-slate-200',
      elevated: 'shadow-lg hover:shadow-xl',
      interactive: 'shadow-md hover:shadow-xl cursor-pointer hover:-translate-y-1',
    };

    const paddings = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    return (
      <div
        ref={ref}
        className={cn(baseStyles, variants[variant], paddings[padding], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('mb-4', className)} {...props}>
    {children}
  </div>
));

CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3 ref={ref} className={cn('text-2xl font-bold text-slate-900', className)} {...props}>
    {children}
  </h3>
));

CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-slate-600 mt-1', className)} {...props}>
    {children}
  </p>
));

CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('', className)} {...props}>
    {children}
  </div>
));

CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('mt-6 pt-4 border-t border-slate-200', className)} {...props}>
    {children}
  </div>
));

CardFooter.displayName = 'CardFooter';

// Example usage:
// <Card variant="interactive">
//   <CardHeader>
//     <CardTitle>Card Title</CardTitle>
//     <CardDescription>Card description goes here</CardDescription>
//   </CardHeader>
//   <CardContent>
//     <p>Your content here</p>
//   </CardContent>
//   <CardFooter>
//     <Button>Action</Button>
//   </CardFooter>
// </Card>
