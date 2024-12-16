import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className,rightAddon,leftAddon, type, ...props }, ref) => {
  return (
      (
          <div
              className={cn(
                  "focus-within:border-primary rounded-md h-10 w-full py-2 items-center px-5 flex border border-input",
                  className
              )}
          >
              {leftAddon && <div className="pr-2 w-10">{leftAddon}</div>}
              <input
                  type={type}
                  className={cn("file:border-0 file:mt-5 " +
                      " file:bg-transparent file:text-sm file:font-medium file:cursor-pointer text-sm h-full w-full bg-transparent placeholder:text-[15px] outline-none",)}
                  ref={ref}
                  {...props}
              />
              {rightAddon && <div>{rightAddon}</div>}
          </div>

      )
  );
})
Input.displayName = "Input"

export {Input}
