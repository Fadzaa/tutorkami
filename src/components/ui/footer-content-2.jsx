import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";

export function FooterContent2({ solved}) {

    return (
        <div className="h-[100px] overflow-hidden flex items-center justify-between gap-4 bg-white border-t-2 border-accent p-4">
            <Button onClick={solved} className="w-full">Solved</Button>
        </div>
    )
}