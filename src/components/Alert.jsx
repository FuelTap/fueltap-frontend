'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

/**
 * A reusable Alert component built on Shadcn's Dialog.
 *
 * ✅ Controlled by parent (open, onClose)
 * ✅ Accepts any JSX as children
 * ✅ Handles accessibility + animations automatically
 */

const Alert = ({ open, onClose, title, description, children, className }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          'rounded-2xl text-center shadow-xl sm:max-w-[425px]',
          className
        )}
      >
        <DialogHeader>
          {title && (
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          )}
          {description && (
            <DialogDescription className="text-muted-foreground">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {/* custom JSX goes here */}
        <div className="mt-4">{children}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Alert;
