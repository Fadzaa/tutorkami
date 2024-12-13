import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";
import {cn} from "@/lib/utils.js";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";


export const ContentDistance = React.forwardRef(({ children,className, ...props }, ref) => (
    <div ref={ref} className={cn(className,"flex-col  flex gap-4 mt-5 mx-10",)} {...props}>
        {children}
    </div>
))


