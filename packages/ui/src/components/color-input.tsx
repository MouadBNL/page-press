import * as React from "react"

import { cn } from "@pagepress/ui/lib/utils"
import { Popover, PopoverAnchor, PopoverContent } from "./popover"
import { ColorPicker } from "./color-picker";

function ColorInput({ className, type = "number", ...props }: React.ComponentProps<"input"> & {
  value?: string | null;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverAnchor>
        <div
          className={cn(
            "h-7 w-full flex items-center min-w-0 rounded-md border border-input bg-input/20 px-2 py-0.5 text-sm transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs/relaxed file:font-medium file:text-foreground placeholder:text-muted-foreground focus-within:border-ring focus-within:ring-2 focus-within:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 md:text-xs/relaxed dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
            className
          )}
        >
          <input
            className="flex-1 focus:ring-0 focus:outline-none"
            type="text"
            data-slot="input"
            value={props.value}
            onChange={(e) => props.onChange?.(e.target.value)}
            {...props}
          />
          <div
            className="w-6 h-4 rounded-md cursor-pointer shadow border "
            style={{ backgroundColor: props.value ?? '#000000' }}
            onClick={() => setOpen(true)}
          />
        </div>
      </PopoverAnchor>
      <PopoverContent>
        <ColorPicker value={props.value} onChange={props.onChange} />
      </PopoverContent>
    </Popover>
  )
}

export { ColorInput }
