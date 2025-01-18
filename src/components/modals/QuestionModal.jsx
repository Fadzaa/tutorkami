import {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "./Modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {questionAPI} from "@/api/question.js";
import useMaterialModal from "@/hooks/use-material-modal.js";
import {cn} from "@/lib/utils.js";
import useQuestionModal from "@/hooks/use-question-modal.js";
import {Button} from "@/components/ui/button.jsx";
import {Close} from "@mui/icons-material";
import {Check} from "lucide-react";

// Define steps
const STEPS = {
    FIRST: 0, SECOND: 1, THIRD: 2,
};

// Validation schema
const FormSchema = z.object({
    subject: z.string().nonempty("Subject is required"),
    topic: z.string().nonempty("Topic is required"),
    total: z.string().nonempty("Total questions is required"),
    type: z.string().nonempty("Question type is required"),
    question_difficulty: z.string().nonempty("Difficulty level is required"),
    target_audience: z.string().nonempty("Target audience is required"),
});

const QuestionModal = ({regenerate, regenerateLoading}) => {

    const materialModal = useQuestionModal();

    const [choices, setChoices] = useState({});

    const navigate = useNavigate();

    const [step, setStep] = useState(STEPS.FIRST);

    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    });


    const onSubmit = useCallback(async () => {
         regenerate(choices)
        materialModal.onClose()
    }, [step, materialModal, form,choices]);



    const [list,setList] = useState([{
        title: "Are the questions too easy or too hard?",
        help_text: "Modify the difficulty level to better match your proficiency.",
        choices: ["Mixed", "Single", "Progressive"],
        type: "question_difficulty",
        showChoices: false,
    },
        {
            title: "Are the questions not tailored to the intended audience?",
            help_text: "Adjust the target audience to refine the difficulty and tone",
            choices: ["High School", "College Student", "Undergraduate", "General", "Professional"],
            type: "target_audience",
            showChoices: false,

        }
    ])


    const handleInput = (itemChoices,item) => {

        const typeChoices = item.type

        const filteredData = Object.keys(choices)
            .filter((key) => key !== item.type)
            .reduce((obj, key) => {
                obj[key] = choices[key];
                return obj;
            }, {});



        setChoices({
            ...filteredData,
            [typeChoices]:itemChoices
        })


    }



    let content = (<>

        {list.map((item) => (<div
            key={item}
            className={cn("flex w-full p-4 ps-0 gap-4 rounded-lg",)}
        >

            <hr className="h-auto w-[1px] bg-black"/>

            <div className="w-full flex flex-col justify-between gap-3">

                <section className={'flex flex-col'}>

                    <div className={'flex justify-between items-start'}>

                        <div>

                            <h1 className="text-base lg:text-lg font-semibold">{item.title}</h1>

                            <div className={'flex justify-between'}>
                                <p className="text-lg lg:text-base text-[#C1C1C1]">{item.help_text}</p>
                            </div>

                        </div>

                    <div className={'flex gap-2'}>
                        {
                            item.showChoices ?<></>:(
                                <>

                                    <Button onClick={()=>setList(list.filter(itemFilter => itemFilter.type != item.type))   } className={'w-fit bg-transparent hover:bg-transparent text-black text-5xl'}>

                                        <Close/>
                                    </Button>


                                    <Button onClick={()=>{


                                        const getAll = {
                                            ...list.find(itemFilter => itemFilter.type == item.type),
                                            showChoices: true,
                                        }


                                        const getAllListExceptCurrentList = list.filter(itemFilter => itemFilter.type != item.type)


                                        setList([
                                            getAll,
                                            ...getAllListExceptCurrentList,
                                        ])


                                    }} className={'w-fit bg-transparent hover:bg-transparent text-black text-5xl'}>

                                        <Check/>
                                    </Button>
                                </>
                            )
                        }
                    </div>



                    </div>

                    {
                        item.showChoices && (
                            <div className={'flex gap-3 mt-3'}>
                                {
                                    item.choices.map(itemChoices => {

                                        // jawaban yang di pilih
                                        const answerchoose = choices[item.type] == itemChoices


                                        return (
                                            <Button

                                                className={cn(
                                                    'rounded-full',
                                                    answerchoose ? "bg-primary/90" : "bg-transparent hover:bg-transparent border-2",
                                                )} onClick={() => handleInput(itemChoices, item)}>

                                                <p className={answerchoose ? "text-white" : "text-primary"}> {itemChoices}</p>

                                            </Button>
                                        )
                                    })
                                }
                            </div>

                        )
                    }


                </section>


            </div>
        </div>))}


    </>)


    return (

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Modal
                progress={0}
                isOpen={materialModal.isOpen}
                onClose={materialModal.onClose}
                onSubmit={onSubmit}
                title="Content Regeneration"
                actionLabel={"Regenerate"}
                regenerateLoading={regenerateLoading}
                disabled={
                    (list.some(item => item.showChoices) &&
                        list.some(item => !choices[item.type])) ||
                    Object.keys(choices).length === 0
                }
                body={content}
            />
        </form>

    );
};

export default QuestionModal;
