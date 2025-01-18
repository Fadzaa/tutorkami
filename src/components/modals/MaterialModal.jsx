import {useCallback, useMemo, useState} from "react";
import Modal from "./Modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {questionAPI} from "@/api/question.js";
import useMaterialModal from "@/hooks/use-material-modal.js";
import {cn} from "@/lib/utils.js";

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

const MaterialModal = ({regenerate,regenerateLoading}) => {

    const materialModal = useMaterialModal();

    const navigate = useNavigate();

    const [step, setStep] = useState(STEPS.FIRST);

    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    });




    const onSubmit = useCallback(async () => {
        regenerate()
        materialModal.onClose()
    }, [step, materialModal, form]);


    const list = [{
        title: "Is the material too easy or too advanced for your current level?",
        help_text: "This helps generate content more suitable for your understanding."
    }, {
        title: "Is the length of the content not meeting your expectations?",
        help_text: "Adjust the content length to better align with your preferences and study needs."
    }, {
        title: "What didn’t meet your expectations in the previous material?",
        help_text: "Provide feedback on what was lacking or confusing in the last version."
    },]


    let content = (<>

            {list.map((item) => (<div
                    key={item}
                    className={cn("flex w-full p-4 ps-0 gap-4 rounded-lg",)}
                >

                    <hr className="h-auto w-[1px] bg-black"/>

                    <div className="w-full flex flex-col justify-between gap-3">

                        <section className={'flex flex-col'}>

                            <h1 className="text-base lg:text-lg font-semibold">{item.title}</h1>

                            <div className={'flex justify-between'}>
                                <p className="text-lg lg:text-base text-[#C1C1C1]">{item.help_text}</p>
                            </div>


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
                body={content}
            />
        </form>

    );
};

export default MaterialModal;
