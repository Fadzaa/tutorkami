import {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "./Modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {questionAPI} from "@/api/question.js";
import  useMaterialModal from "@/hooks/use-material-modal.js";
import {cn} from "@/lib/utils.js";
import useQuestionModal from "@/hooks/use-question-modal.js";
import {Button} from "@/components/ui/button.jsx";
import {Close} from "@mui/icons-material";
import {Check} from "lucide-react";
import useQuestionTimeStop from "@/hooks/use-question-time-stop.js";

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

const QuestionTimeModal = ({regenerate, regenerateLoading}) => {

    const materialModal = useQuestionTimeStop();

    const [choices, setChoices] = useState({});

    const navigate = useNavigate();

    const [step, setStep] = useState(STEPS.FIRST);

    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    });


    const onSubmit = useCallback(async () => {
        regenerate()
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

        <h1>Waktu Kamu udah habis ulangin lagi ngga sih ?</h1>

    </>)


    return (

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Modal
                progress={0}
                isOpen={materialModal.isOpen}
                onClose={materialModal.onClose}
                onSubmit={onSubmit}
                title="Content Regeneration"
                actionLabel={"Coba Lagi"}
                regenerateLoading={regenerateLoading}
                disabled={
                  false
                }
                body={content}
            />
        </form>

    );
};

export default QuestionTimeModal;
