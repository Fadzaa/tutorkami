

import {format} from "date-fns";
import {Label} from "@/components/ui/label.jsx";

export function LabelTitleContent({children}) {


    return (
        <Label className={'text-2xl mb-3'}>{children}</Label>
    )
}