import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.jsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useMutation} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";
import {RoadmapSidebar} from "@/components/sidebar/RoadmapSidebar.jsx";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {useNavigate} from "react-router-dom";
import {LoadingGeneratingContent} from "@/components/loading/LoadingGeneratingContent.jsx";
import {SheetContentMobile} from "@/components/content/SheetContentMobile.jsx";
import {langHandler} from "@/lib/langHandler.js";
import {useTranslation} from "react-i18next";
import {CommonFormItem} from "@/components/form/CommonFormItem.jsx";
import {CommonSelectItem} from "@/components/form/CommonSelectItem.jsx";
import {useState} from "react";

const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    proficiency_level: z
        .string(),
    user_proficiency_level: z
        .string(),
    timeline: z
        .string()
})



export function CreateRoadmapPage() {
    const {t} = useTranslation()
    const [step, setStep] = useState(1)

    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })


    const navigate = useNavigate()

    const {mutate, isPending,} = useMutation({
        mutationKey: ["postRoadmap"], mutationFn: async (body) => {
            try {
                return await api.post("roadmap", body);
            } catch (error) {
                return makeResponseFailed({
                    message: error,
                })
            }
        },

        onSuccess: (response) => {

            navigate("/tools/generative-roadmap/detail/" + response.data.data.id);
        },

        onError: (error) => {
            console.log(error)
        },

        onMutate: async () => {

        },

    })


    const onSubmit = (data) => {
        mutate({...data, language: langHandler.get() === "id" ? "Indonesian" : "English"})
    }

    const explanationProficiencyUser = {
        "Zero Knowledge": {
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

    const explanationGoals = {
        "Learn Basics": {
            "header": t('explanation_basic_goals'),
            "descriptions": [
                t('explanation_basic_goals_desc1'),
                t('explanation_basic_goals_desc2'),
                t('explanation_basic_goals_desc3')
            ]
        },
        "Master a Subject": {
            "header": t('explanation_subject_goals'),
            "descriptions": [
                t('explanation_subject_goals_desc1'),
                t('explanation_subject_goals_desc2'),
                t('explanation_subject_goals_desc3')
            ]
        },
        "Exam Preparation": {
            "header": t('explanation_exam_goals'),
            "descriptions": [
                t('explanation_exam_goals_desc1'),
                t('explanation_exam_goals_desc2'),
                t('explanation_exam_goals_desc3')
            ]
        },
        "Project-Based Learning": {
            "header": t('explanation_project_goals'),
            "descriptions": [
                t('explanation_project_goals_desc1'),
                t('explanation_project_goals_desc2'),
                t('explanation_project_goals_desc3')
            ]
        },
        "Career Development": {
            "header": t('explanation_career_goals'),
            "descriptions": [
                t('explanation_career_goals_desc1'),
                t('explanation_career_goals_desc2'),
                t('explanation_career_goals_desc3')
            ]
        },
        "General Knowledge": {
            "header": t('explanation_general_goals'),
            "descriptions": [
                t('explanation_general_goals_desc1'),
                t('explanation_general_goals_desc2'),
                t('explanation_general_goals_desc3')
            ]
        }
    }

    const explanationTimeline = {
        "No Timeline": {
            "header": t('explanation_no_timeline'),
            "descriptions": [
                t('explanation_no_timeline_desc1'),
                t('explanation_no_timeline_desc2')
            ]
        },
        "1 - 3 months": {
            "header": t('explanation_onethree_timeline'),
            "descriptions": [
                t('explanation_onethree_timeline_desc1'),
                t('explanation_onethree_timeline_desc2')
            ]
        },
        "3 - 6 months": {
            "header": t('explanation_threesix_timeline'),
            "descriptions": [
                t('explanation_threesix_timeline_desc1'),
                t('explanation_threesix_timeline_desc2')
            ]
        },
        "6 - 12 months": {
            "header": t('explanation_sixtwelve_timeline'),
            "descriptions": [
                t('explanation_sixtwelve_timeline_desc1'),
                t('explanation_sixtwelve_timeline_desc2')
            ]
        },
        "12+ months": {
            "header": t('explanation_twelvemore_timeline'),
            "descriptions": [
                t('explanation_twelvemore_timeline_desc1'),
                t('explanation_twelvemore_timeline_desc2')
            ]
        }
    }

    const optionTimeline = [
        { value: "No Timeline", label: "No Timeline" },
        { value: "1 - 3 months", label: "1 - 3 months" },
        { value: "3 - 6 months", label: "3 - 6 months" },
        { value: "6 - 12 months", label: "6 - 12 months" },
        { value: "12+ months", label: "12+ months" }
    ];

    const optionGoals = [
        { value: "Learn Basics", label: "Learn Basics" },
        { value: "Master a Subject", label: "Master a Subject" },
        { value: "Exam Preparation", label: "Exam Preparation" },
        { value: "Project-Based Learning", label: "Project-Based Learning" },
        { value: "General Knowledge", label: "General Knowledge" }
    ];

    const optionProficiencyUser = [
        { value: "Zero Knowledge", label: "Zero Knowledge" },
        { value: "Basic Understanding", label: "Basic Understanding" },
        { value: "Intermediate Knowledge", label: "Intermediate Knowledge" },
        { value: "Expert Knowledge", label: "Expert Knowledge" },
        { value: "Let Me Explain Myself", label: "Let Me Explain Myself" }
    ];


    return (<div className="h-[90vh] overflow-hidden flex">
            <RoadmapSidebar/>

            <div className="absolute w-full h-full lg:hidden">
                <div className="absolute left-0 top-5">
                    <SheetContentMobile type={"roadmap"}/>
                </div>
            </div>

            <ContentDistance className={"relative flex-1"}>

                <LabelTitleContent>
                    Generate Study Roadmap
                </LabelTitleContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full pb-4">
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
                                name="proficiency_level"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_proficiency_head")}
                                        description={t("create_proficiency_desc")}
                                        placeholder={optionProficiencyUser[0].label}
                                        explanation={explanationProficiencyUser}
                                        options={optionProficiencyUser}
                                        value={optionProficiencyUser[0].value}
                                    />

                                )}
                            />
                        </div>
                        <div className={`${step === 2 ? "flex flex-col gap-8" : "hidden"}`}>
                            <FormField
                                control={form.control}
                                name="user_proficiency_level"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_goals_head")}
                                        description={t("create_goals_desc")}
                                        placeholder={optionGoals[0].label}
                                        explanation={explanationGoals}
                                        options={optionGoals}
                                        value={optionGoals[0].value}
                                    />

                                )}
                            />
                            <FormField
                                control={form.control}
                                name="timeline"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_timeline_head")}
                                        description={t("create_timeline_desc")}
                                        placeholder={optionTimeline[0].label}
                                        explanation={explanationTimeline}
                                        options={optionTimeline}
                                        value={optionTimeline[0].value}
                                    />

                                )}
                            />
                        </div>


                        <div className="flex-grow"></div>

                        {
                            step === 1 ?
                                (
                                    <Button onClick={() => setStep(step + 1)} className="w-full">
                                        Next Step
                                    </Button>
                                )
                                :
                                (
                                    <div className="flex gap-5">
                                        {
                                            step === 2 &&
                                            <Button
                                                onClick={() => setStep(step - 1)}
                                                className="w-full">
                                                Previous Step
                                            </Button>
                                        }
                                        <Button className="w-full" type="submit">
                                            Generate Roadmap
                                        </Button>

                                    </div>
                                )
                        }
                    </form>
                </Form>

                {
                    isPending ? <LoadingGeneratingContent isPending={isPending} type="roadmap"/> : <></>
                }

            </ContentDistance>


        </div>
    )


}