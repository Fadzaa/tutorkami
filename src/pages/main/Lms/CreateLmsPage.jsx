import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.jsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {LMSSidebar} from "@/components/sidebar/LMSSidebar.jsx";
import {useDispatch, useSelector} from "react-redux";
import {langHandler} from "@/lib/langHandler.js";
import {setLoadingGlobal} from "@/lib/utils/global/slice/LoadingSlice.js";
import {setProgressGlobal} from "@/lib/utils/global/slice/ProgressSlice.js";
import {useLoading} from "@/lib/utils/global/LoadingProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {CommonFormItem} from "@/components/form/CommonFormItem.jsx";
import {CommonSelectItem} from "@/components/form/CommonSelectItem.jsx";
import {CommonSuggestionItem} from "@/components/form/CommonSuggestionItem.jsx";
import {suggestionAPI} from "@/api/suggestion.js";
import debounce from "lodash.debounce";


const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    // difficulty: z
    //     .string(),
    // proficiency_level: z
    //     .string(),
    // length: z
    //     .string(),
    long_loading: z
        .boolean(),
    activity_type: z
        .string(),

})

export function CreateLmsPage() {
    const {t} = useTranslation()
    const [step, setStep] = useState(1)

    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })
    const {fetchLMS} = useLoading();
    const navigate = useNavigate()

    const loading = useSelector((state) => state.loading);
    const onSubmit = () => {
        fetchLMS("lms/start", {
            ...form.getValues(),
            language: langHandler.get() === "id" ? "Indonesian" : "English",
            difficulty: "Beginner-Friendly",


        }, () => navigate("/tools/generative-lms/"))
    };

    const handleChange = (field, value) => field.onChange(value?.value)

    const promiseOptions = (inputValue, callback) => {
        suggestionAPI.getUniversalSuggestion(inputValue, callback)
    }

    const loadSuggestions = debounce(promiseOptions, 1000)

    const explanationFinalReview = {
        "Practical-Quiz": {
            header: t('explanation_quiz_review'),
            descriptions: [
                t('explanation_quiz_review_desc1'),
                t('explanation_quiz_review_desc2'),
                t('explanation_quiz_review_desc3')
            ]
        },
        "Capstone-Project": {
            header: t('explanation_capstone_review'),
            descriptions: [
                t('explanation_capstone_review_desc1'),
                t('explanation_capstone_review_desc2'),
                t('explanation_capstone_review_desc3')
            ]
        }
    };


    const optionFinalReview = [
        {
            "value": "Practical-Quiz",
            "label": "Practical-Quiz"
        },
        {
            "value": "Capstone-Project",
            "label": "Capstone-Project"
        },
    ]




    return (
        <div className="h-[90vh] overflow-hidden flex">
            <LMSSidebar/>

            <ContentDistance className={"relative flex-1"}>

                <LabelTitleContent>

                    Generate Study LMS

                </LabelTitleContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full pb-4 gap-8">
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
                                <CommonSuggestionItem
                                    field={field}
                                    label={t("create_topic_head")}
                                    description={t("create_topic_desc")}
                                    placeholder={"Add topic you want to focus on"}
                                    handleChange={(value) => handleChange(field, value)}
                                    loadSuggestions={loadSuggestions}
                                />
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="activity_type"
                            render={({field}) => (
                                <CommonSelectItem
                                    field={field}
                                    label={t("create_audience_head")}
                                    description={t("create_audience_desc")}
                                    placeholder={optionFinalReview[0].label}
                                    explanation={explanationFinalReview}
                                    options={optionFinalReview}
                                    value={optionFinalReview[0].value}
                                />

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="long_loading"
                            render={({field}) => (<FormItem>
                                <FormLabel>Do you prefer long loading for generate all content ?</FormLabel>
                                <Select onValueChange={(value) => field.onChange(value === "true")}
                                        defaultValue={field.value !== null ? field.value : ""}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Long Loading (2 Minutes)"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="true">Yes</SelectItem>
                                        <SelectItem value="false">No</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>)}
                        />

                        <div className="flex-grow"></div>


                        <Button className="w-full" type="submit">
                            Generate LMS
                        </Button>


                    </form>
                </Form>

            </ContentDistance>


        </div>


    )
}