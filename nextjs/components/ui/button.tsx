import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { forwardRef } from "react";
import { Tooltip } from "react-tooltip";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
        outline:
          "border border-slate-200 bg-transparent hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-800",
        ghost:
          "bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 dark:text-slate-100",
        secondary:
          "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1 text-sm",
        lg: "px-8 py-4",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  tooltip?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      tooltip,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <button
          className={cn(
            buttonVariants({ variant, size, fullWidth, className })
          )}
          ref={ref}
          disabled={disabled}
          data-tooltip-id={`clarity-tooltip-${tooltip}`}
          {...props}
        >
          {children}
        </button>
        <Tooltip id={`clarity-tooltip-${tooltip}`} content={tooltip} />
      </>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
