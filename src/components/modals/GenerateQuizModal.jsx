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

    const [step, setStep] = useState(STEPS.FIRST);

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

    const optionQuestionType = [
        {
            "value": "Multiple Choice",
            "label": "Multiple Choice"
        },
        {
            "value": "True/False",
            "label": "True/False"
        },
        {
            "value": "Fill-in-the-Blank",
            "label": "Fill-in-the-Blank"
        },

        {
            "value": "Short Answer",
            "label": "Short Answer"
        }
    ]

    const optionAudience = [
        {
            "value": "General",
            "label": "General"
        },
        {
            "value": "High School",
            "label": "High School"
        },
        {
            "value": "College Student",
            "label": "College"
        },
        {
            "value": "Undergraduate",
            "label": "Undergraduate"
        },
        {
            "value": "Professional",
            "label": "Professional"
        }
    ]

    const optionTotalQuestion = [
        {
            "value": "5",
            "label": "5"
        },
        {
            "value": "10",
            "label": "10"
        },
        {
            "value": "15",
            "label": "15"
        },
        {
            "value": "30",
            "label": "30"
        }
    ]

    const optionDifficulty = [
        {
            "value": "Mixed",
            "label": "Mixed"
        },
        {
            "value": "Progressive",
            "label": "Progressive"
        },
        {
            "value": "Beginner",
            "label": "Beginner"
        },
        {
            "value": "Intermediate",
            "label": "Intermediate"
        },
        {
            "value": "Expert",
            "label": "Expert"
        }
    ]

    const optionTimeLimit = [
        {
            "value": "0",
            "label": "No Time Limit"
        },
        {
            "value": "5",
            "label": "5 Minutes"
        },
        {
            "value": "10",
            "label": "10 Minutes"
        },
        {
            "value": "15",
            "label": "15 Minutes"
        },
        {
            "value": "30",
            "label": "30 Minutes"
        }
    ]

    const optionIncludes = [
        {
            "value": "Yes",
            "label": "Yes"
        },
        {
            "value": "No",
            "label": "No"
        },

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
                                            placeholder={optionAudience[0].label}
                                            explanation={null}
                                            options={optionAudience}
                                            value={optionAudience[0].value}
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
                                            placeholder={optionTotalQuestion[0].label}
                                            explanation={null}
                                            options={optionTotalQuestion}
                                            value={optionTotalQuestion[0].value}
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
                                            placeholder={optionQuestionType[0].label}
                                            explanation={null}
                                            options={optionQuestionType}
                                            value={optionQuestionType[0].value}

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
                                            placeholder={optionDifficulty[0].label}
                                            explanation={null}
                                            options={optionDifficulty}
                                            value={optionDifficulty[0].value}
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
