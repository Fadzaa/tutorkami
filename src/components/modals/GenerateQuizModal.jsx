import {useEffect, useState} from "react";
import Modal from "./Modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {questionAPI} from "@/api/question.js";
import useMaterialGenerateQuizModal from "@/hooks/use-material-generate-quiz-modal.js";
import {Form, FormField} from "@/components/ui/form.jsx";
import {CommonFormItem} from "@/components/form/CommonFormItem.jsx";
import {CommonSelectItem} from "@/components/form/CommonSelectItem.jsx";
import {useTranslation} from "react-i18next";
import {toast} from "@/hooks/use-toast.js";
import {langHandler} from "@/lib/langHandler.js";
import {LoadingGeneratingContent} from "@/components/loading/LoadingGeneratingContent.jsx";

// Define steps
const STEPS = {
    FIRST: 0, SECOND: 1, THIRD: 2,
};

// Validation schema
const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    total: z
        .string(),
    time_limit: z
        .string(),
    type: z
        .string(),
    question_difficulty: z
        .string(),
    target_audience: z
        .string(),
    include_answer: z
        .string(),
    explanations: z
        .string(),

})

const GenerateQuizModal = ({subject, topic}) => {
    const {t} = useTranslation()
    const modal = useMaterialGenerateQuizModal();


    const navigate = useNavigate();

    const [step, setStep] = useState(STEPS.SECOND);

    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })

    const {mutate, isPending} = useMutation({
        mutationKey: ["postQuestion"],
        mutationFn: async (body) => await questionAPI.postQuestion(body),
        onSuccess: (response) => {
            toast({
                title: "Create Question Success",
                description: "You have successfully create question.",
            })
            navigate("/tools/generative-question/detail/" + response.data.data.id)
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Create Question Failed",
                description: "Failed create question.",
            })
            console.log("onError: " + error)
            console.log(error)
        }
    })


    const onSubmit = () => {
        const formData = form.getValues();
        console.log(formData)
        mutate({
            ...formData,
            subject: subject,
            topic: topic,
            language: langHandler.get() === "id" ? "Indonesian" : "English",
        })

        console.log("CHECK THE MUTATED SENT DATA")
        console.log(
            {
                ...formData,
                subject: subject,
                topic: topic,
                language: langHandler.get() === "id" ? "Indonesian" : "English",
            }
        )
    }


    const optionAudience = [
        "General",
        "High School",
        "College",
        "Undergraduate",
        "Professional",
    ]

    const optionTotalQuestion = [
        "5",
        "10",
        "15",
        "30"
    ]

    const optionQuestionType = [
        "Multiple Choice",
        "True/False",
        "Fill-in-the-Blank",
        "Short Answer"
    ]

    const optionDifficulty = [
        "Mixed",
        "Progressive",
        "Beginner",
        "Intermediate",
        "Expert",
    ]

    const optionTimeLimit = [
        "0",
        "15",
        "30",
        "45",
        "Custom"
    ]

    const optionIncludes = [
        "Yes",
        "No"
    ]



    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Modal
                    progress={0}
                    isOpen={modal.isOpen}
                    onClose={modal.onClose}
                    onSubmit={step === STEPS.FIRST ? () => setStep(STEPS.SECOND) : onSubmit}
                    title="Quiz Generate"
                    actionLabel={step === STEPS.FIRST ? "Next" : "Generate Quiz"}
                    regenerateLoading={isPending}
                    disabled={
                        false
                    }
                    body={
                        <>
                            <div className={`${step === STEPS.FIRST ? "flex flex-col gap-8" : "hidden"}`}>
                                <FormField
                                    control={form.control}
                                    name="target_audience"
                                    render={({field}) => (
                                        <CommonSelectItem
                                            field={field}
                                            label={t("create_audience_head")}
                                            description={t("create_audience_desc")}
                                            placeholder={optionAudience[0]}
                                            explanation={null}
                                            options={optionAudience}
                                        />

                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="total"
                                    render={({field}) => (
                                        <CommonSelectItem
                                            field={field}
                                            label={t("create_total_question_head")}
                                            description={t("create_total_question_desc")}
                                            placeholder={optionTotalQuestion[0]}
                                            explanation={null}
                                            options={optionTotalQuestion}
                                        />

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({field}) => (
                                        <CommonSelectItem
                                            field={field}
                                            label={t("create_question_type_head")}
                                            description={t("create_question_type_desc")}
                                            placeholder={optionQuestionType[0]}
                                            explanation={null}
                                            options={optionQuestionType}
                                        />

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="question_difficulty"
                                    render={({field}) => (
                                        <CommonSelectItem
                                            field={field}
                                            label={t("create_difficulty_head")}
                                            description={t("create_difficulty_desc")}
                                            placeholder={optionDifficulty[0]}
                                            explanation={null}
                                            options={optionDifficulty}
                                        />

                                    )}
                                />
                            </div>
                            <div className={`${step === STEPS.SECOND ? "flex flex-col gap-8" : "hidden"}`}>
                                <FormField
                                    control={form.control}
                                    name="time_limit"
                                    render={({field}) => (
                                        <CommonSelectItem
                                            field={field}
                                            label={t("create_timelimit_head")}
                                            description={t("create_timelimit_desc")}
                                            placeholder={optionTimeLimit[0]}
                                            explanation={null}
                                            options={optionTimeLimit}
                                        />

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="include_answer"
                                    render={({field}) => (
                                        <CommonSelectItem
                                            field={field}
                                            label={t("create_inclanswers_head")}
                                            description={t("create_inclanswers_desc")}
                                            placeholder={optionIncludes[0]}
                                            explanation={null}
                                            options={optionIncludes}
                                        />

                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="explanations"
                                    render={({field}) => (
                                        <CommonSelectItem
                                            field={field}
                                            label={t("create_inclexplanation_head")}
                                            description={t("create_inclexplanation_desc")}
                                            placeholder={optionIncludes[0]}
                                            explanation={null}
                                            options={optionIncludes}
                                        />

                                    )}
                                />
                            </div>
                        </>
                    }
                />
            </form>

        </Form>
    );
};

export default GenerateQuizModal;
