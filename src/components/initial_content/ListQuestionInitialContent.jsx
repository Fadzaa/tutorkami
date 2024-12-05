import {Input} from "@/components/ui/input.jsx";
import {
        Select,
        SelectContent,
        SelectItem,
        SelectTrigger,
        SelectValue,
} from "@/components/ui/select.jsx"
import { Checkbox } from "@/components/ui/checkbox.jsx"
import {Button} from "@/components/ui/button.jsx";


export function ListQuestionInitialContent() {
        const questionType = [
            "multiple_choice",
            "true_false",
            "fill_in_the_blank",
            "short_answer",
        ]

        const proficiencyLevel = [
                "Beginner",
                "Intermediate",
                "Expert"
        ]

        const schoolLevel = [
                "Junior High School",
                "Senior High School",
                "College"
        ]


        return (
            <div className="flex flex-col h-full w-2/3 px-10 py-5 ">

                    <h1 className="text-2xl mb-3">Generate List of Questions</h1>

                    <div className="flex items-start gap-5">
                            <div className="w-full">
                                    <label htmlFor="topic">What topic you interested in?</label>
                                    <Input
                                        id="topic"
                                        placeholder="Enter Topic"
                                        type="text"
                                        className="mt-3"
                                    />

                                    <div className="h-3"></div>

                                    <label htmlFor="total_questions">How much you want us to generated?</label>
                                    <Input
                                        id="total_questions"
                                        placeholder="Total Questions"
                                        type="number"
                                        className="mt-3"
                                    />

                                    <div className="h-3"></div>

                                    <p>What kind of questions you want?</p>
                                    <Select onValueChange={value => (
                                        console.log(value)
                                    )}>
                                            <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Questions Type"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                    {questionType.map((item, index) => (
                                                        <SelectItem key={index} value={item}>{item}</SelectItem>
                                                    ))}
                                            </SelectContent>
                                    </Select>

                                    <div className="h-3"></div>

                                    <p>What proficiency you prefer</p>
                                    <Select onValueChange={value => (
                                        console.log(value)
                                    )}>
                                            <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Proficiency Level"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                    {proficiencyLevel.map((item, index) => (
                                                        <SelectItem key={index} value={item}>{item}</SelectItem>
                                                    ))}
                                            </SelectContent>
                                    </Select>

                                    <div className="h-3"></div>

                                    <p>School Level</p>
                                    <Select onValueChange={value => (
                                        console.log(value)
                                    )}>
                                            <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Theme"/>
                                            </SelectTrigger>
                                            <SelectContent>
                                                    {schoolLevel.map((item, index) => (
                                                        <SelectItem key={index} value={item}>{item}</SelectItem>
                                                    ))}
                                            </SelectContent>
                                    </Select>
                            </div>

                            <div className="w-full">
                                    <h2 className="mb-4">Answer Customization</h2>

                                <div className="flex items-center gap-4">
                                    <Checkbox id="terms1" />
                                    <div className="grid gap-1.5 leading-none">
                                        <label
                                            htmlFor="terms1"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Accept terms and conditions
                                        </label>
                                        <p className="text-sm text-muted-foreground">
                                            You agree to our Terms of Service and Privacy Policy.
                                        </p>
                                    </div>
                                </div>
                            </div>
                    </div>

                    <div className="h-full"></div>

                    <Button>Generate Questions</Button>

            </div>
        )
}