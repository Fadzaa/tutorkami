import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Checkbox} from "@/components/ui/checkbox.jsx";
import {Button} from "@/components/ui/button.jsx";
import {QuestionCard} from "@/components/card/QuestionCard.jsx";

export function ListQuestionContent() {



    return (
        <div className="flex flex-col h-full w-2/3 px-10 py-5 ">

            <div className="flex w-full justify-between items-center">
                <div>
                    <h1 className="text-2xl mb-3">Geometry</h1>
                    <p>15 Questions • Expert • Science</p>
                </div>

                <h2>Solved</h2>
            </div>



            <QuestionCard type={"test"} question={"test"}/>


            <div className="h-full">

                <p>awdaw</p>

            </div>

            <Button>Generate Questions</Button>

        </div>
    )
}