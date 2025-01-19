import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form.jsx"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useMutation} from "@tanstack/react-query";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";
import {QuestionSidebar} from "@/components/sidebar/QuestionSidebar.jsx";
import {LoadingGeneratingContent} from "@/components/loading/LoadingGeneratingContent.jsx";
import {FallbackAIRefusal} from "@/components/fallback/FallbackAIRefusal.jsx";
import {SheetContentMobile} from "@/components/content/SheetContentMobile.jsx";
import {commonAPI} from "@/api/common.js";
import {questionAPI} from "@/api/question.js";
import AsyncCreatableSelect from "react-select/async-creatable";
import debounce from 'lodash.debounce';
import {suggestionAPI} from "@/api/suggestion.js";
import {useToast} from "@/hooks/use-toast.js";
import {langHandler} from "@/lib/langHandler.js";
import {useEffect, useState} from "react";
import {CommonFormItem} from "@/components/form/CommonFormItem.jsx";
import {CommonSelectItem} from "@/components/form/CommonSelectItem.jsx";
import {useTranslation} from "react-i18next";

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

export function CreateQuestionPage() {
    const {t} = useTranslation()
    const [step, setStep] = useState(1)

    //zod validation
    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })
    const {toast} = useToast()
    const navigate = useNavigate()

    const promiseOptions = (inputValue, callback) => {
        suggestionAPI.getUniversalSuggestion(inputValue, callback)
    }

    const loadSuggestions = debounce(promiseOptions, 1000)

    const {mutate, isPending,} = useMutation({
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


    const onSubmit = (data) => {
        console.log(data)
        mutate({
            ...data,
            language: langHandler.get() === "id" ? "Indonesian" : "English",
        })
    }

    const explanationAudience = {
        "General": {
            "header": t('explanation_zero_knowledge'),
            "descriptions": [
                t('explanation_zero_knowledge_desc1'),
                t('explanation_zero_knowledge_desc2')
            ]
        },
        "Basic Understanding": {
            "header": t('explanation_basic_understanding'),
            "descriptions": [
                t('explanation_basic_understanding_desc1'),
                t('explanation_basic_understanding_desc2')
            ]
        },
        "Intermediate Knowledge": {
            "header": t('explanation_intermediate_knowledge'),
            "descriptions": [
                t('explanation_intermediate_knowledge_desc1'),
                t('explanation_intermediate_knowledge_desc2')
            ]
        },
        "Expert Knowledge": {
            "header": t('explanation_expert_knowledge'),
            "descriptions": [
                t('explanation_expert_knowledge_desc1'),
                t('explanation_expert_knowledge_desc2')
            ]
        },
        "Let Me Explain Myself": {
            "header": t('explanation_explain_myself'),
            "descriptions": [
                t('explanation_explain_myself_desc1'),
                t('explanation_explain_myself_desc2')
            ]
        }
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

    const explanationQuestionType = {
        "Multiple Choice": {
            "header": t('explanation_mcq'),
            "descriptions": [
                t('explanation_mcq_desc1'),
                t('explanation_mcq_desc2'),
                t('explanation_mcq_desc3')
            ]
        },
        "Fill-in-the-Blank": {
            "header": t('explanation_fill_blank'),
            "descriptions": [
                t('explanation_fill_blank_desc1'),
                t('explanation_fill_blank_desc2'),
                t('explanation_fill_blank_desc3')
            ]
        },
        "True/False": {
            "header": t('explanation_truefalse'),
            "descriptions": [
                t('explanation_truefalse_desc1'),
                t('explanation_truefalse_desc2'),
                t('explanation_truefalse_desc3')
            ]
        },
        "Short Answer": {
            "header": t('explanation_short_answer'),
            "descriptions": [
                t('explanation_short_answer_desc1'),
                t('explanation_short_answer_desc2'),
                t('explanation_short_answer_desc3')
            ]
        }
    }

    const optionQuestionType = [
        "Multiple Choice",
        "True/False",
        "Fill-in-the-Blank",
        "Short Answer"
    ]

    const explanationDifficulty = {
        "Mixed": {
            "header": t('explanation_mixed_difficulty'),
            "descriptions": [
                t('explanation_mixed_difficulty_desc1'),
                t('explanation_mixed_difficulty_desc2')
            ]
        },
        "Progressive": {
            "header": t('explanation_progressive_difficulty'),
            "descriptions": [
                t('explanation_progressive_difficulty_desc1'),
                t('explanation_progressive_difficulty_desc2')
            ]
        },
        "Beginner": {
            "header": t('explanation_beginner_difficulty'),
            "descriptions": [
                t('explanation_beginner_difficulty_desc1'),
                t('explanation_beginner_difficulty_desc2')
            ]
        },
        "Intermediate": {
            "header": t('explanation_intermediate_difficulty'),
            "descriptions": [
                t('explanation_intermediate_difficulty_desc1'),
                t('explanation_intermediate_difficulty_desc2')
            ]
        },
        "Expert": {
            "header": t('explanation_expert_difficulty'),
            "descriptions": [
                t('explanation_expert_difficulty_desc1'),
                t('explanation_expert_difficulty_desc2')
            ]
        }
    }

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

        <div className="h-[90vh] overflow-hidden flex">
            <QuestionSidebar/>

            <div className="absolute w-full h-full lg:hidden">
                <div className="absolute left-0 top-5">
                    <SheetContentMobile type={"roadmap"}/>
                </div>
            </div>


            <ContentDistance className={"relative flex-1 "}>

                <LabelTitleContent>

                    Generate List Questions

                </LabelTitleContent>

                <Form {...form}>
                    <form className="flex flex-col h-full pb-4">
                        <div className={`${step === 1 ? "flex flex-col gap-8" : "hidden"}`}>
                            <FormField
                                control={form.control}
                                name="subject"
                                render={({field}) => (
                                    <CommonFormItem
                                        field={field}
                                        label={t("create_subject_head")}
                                        description={t("create_subject_desc")}
                                        placeholder={"Add subject you want to focus on"}
                                        suggestion={
                                            [
                                                "Math",
                                                "Biology",
                                                "English",
                                                "History",
                                                "Programming"
                                            ]
                                        }
                                    />
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="topic"
                                render={({field}) => (
                                    <CommonFormItem
                                        field={field}
                                        label={t("create_topic_head")}
                                        description={t("create_topic_desc")}
                                        placeholder={"Add topic you want to focus on"}
                                        suggestion={
                                            [
                                                "Math",
                                                "Biology",
                                                "English",
                                                "History",
                                                "Programming"
                                            ]
                                        }
                                    />

                                )}
                            />
                            <FormField
                                control={form.control}
                                name="target_audience"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_audience_head")}
                                        description={t("create_audience_desc")}
                                        placeholder={optionAudience[0]}
                                        explanation={explanationAudience}
                                        options={optionAudience}
                                    />

                                )}
                            />
                        </div>
                        <div className={`${step === 2 ? "flex flex-col gap-8" : "hidden"}`}>
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
                                        explanation={explanationQuestionType}
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
                                        explanation={explanationDifficulty}
                                        options={optionDifficulty}
                                    />

                                )}
                            />
                        </div>
                        <div className={`${step === 3 ? "flex flex-col gap-8" : "hidden"}`}>
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


                        <div className="flex-grow"></div>

                        {
                            step === 1 ? (
                                <Button
                                    type="button"
                                    onClick={() => setStep(step + 1)} className="w-full">
                                    Next Step
                                </Button>
                            ) : (
                                <div className="flex gap-5">
                                    {step > 1 && (
                                        <Button
                                            type="button"
                                            onClick={() => setStep(step - 1)}
                                            className="w-full"
                                        >
                                            Previous Step
                                        </Button>
                                    )}
                                    {step < 3 ? (
                                        <Button
                                            type="button"
                                            onClick={() => setStep(step + 1)}
                                            className="w-full"
                                        >
                                            Next Step
                                        </Button>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={
                                                form.handleSubmit(onSubmit)
                                            }
                                            className="w-full"
                                        >
                                            Submit
                                        </Button>
                                    )}
                                </div>
                            )
                        }


                    </form>
                </Form>

                {isPending ? <LoadingGeneratingContent isPending={isPending} type={"question"}/> : <></>}

            </ContentDistance>


        </div>


    )
}