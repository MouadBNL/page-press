import * as React from "react"

import { cn } from "@pagepress/ui/lib/utils"

function NumberInput({ className, type = "number", ...props }: React.ComponentProps<"input"> & {
  value?: number;
  onChange?: (value: number) => void;
}) {
  

  const value = props.value ?? 0;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    console.log('value', value);
    props.onChange?.(Number(e.target.value));
  }
  
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-7 w-full min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-xs/relaxed dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      value={value}
      onChange={handleChange}
      {...props}
    />
  )
}

export { NumberInput }
