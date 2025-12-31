import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '@/lib/utils';

const base =
  'inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none disabled:pointer-events-none disabled:opacity-50';

const variants = {
  default: 'bg-black text-white hover:bg-black/90',
  outline: 'border border-gray-200 bg-transparent hover:bg-gray-100',
  ghost: 'hover:bg-gray-100'
};

export const Button = React.forwardRef(function Button(
  { className, variant = 'default', asChild = false, ...props },
  ref
) {
  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      ref={ref}
      className={cn(base, variants[variant] || variants.default, className)}
      {...props}
    />
  );
});

Button.displayName = 'Button';
