import {Button} from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";

export function FooterContent({url}) {


     const navigate = useNavigate();

    return (
        <div className="h-[100px] flex items-center justify-between gap-4 bg-white border-t-2 border-accent p-4">
            <Button onClick={()=>navigate(url)} className="w-full">Regenerate</Button>
            <Button onClick={()=>navigate("/tools/generative-list-question")}  className="w-full">Generate a Quiz</Button>
        </div>
    )
}