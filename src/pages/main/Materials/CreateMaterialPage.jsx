import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.jsx"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useMutation} from "@tanstack/react-query";
import {api, makeResponseFailed} from "@/api/api.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";
import {MaterialSidebar} from "@/components/sidebar/MaterialSidebar.jsx";
import {LoadingGeneratingContent} from "@/components/loading/LoadingGeneratingContent.jsx";
import {SheetContentMobile} from "@/components/content/SheetContentMobile.jsx";
import {materialAPI} from "@/api/material.js";
import AsyncCreatableSelect from "react-select/async-creatable";
import {commonAPI} from "@/api/common.js";
import debounce from "lodash.debounce";
import {suggestionAPI} from "@/api/suggestion.js";
import {useToast} from "@/hooks/use-toast.js";
import {langHandler} from "@/lib/langHandler.js";
import {CommonFormItem} from "@/components/form/CommonFormItem.jsx";
import {CommonSelectItem} from "@/components/form/CommonSelectItem.jsx";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {CommonSuggestionItem} from "@/components/form/CommonSuggestionItem.jsx";

const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    prior_knowledge: z
        .string(),
    content_depth: z
        .string(),
    output_format: z
        .string()
})




export function CreateMaterialPage() {
    const {t} = useTranslation()
    const [step, setStep] = useState(1)

    const navigate = useNavigate()
    const {toast} = useToast()
    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })


    const {mutate, isPending,} = useMutation({
        mutationFn: async (body) => await materialAPI.postMaterial(body),
        onSuccess: (response) => {
            toast({
                title: "Create Material Success",
                description: "You have successfully create material.",
            })
            navigate("/tools/generative-material/detail/" + response.data.data.id);
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Create Material Failed",
                description: "Failed create material.",
            })
            console.log("onError: " + error)
            console.log(error)
        },
    })

    const onSubmit = (data) => mutate(
        {...data,
            language: langHandler.get() === "id" ? "Indonesian" : "English",
            proficiency_level: "Intermediate Level",
            style_customization : "Professional Style",
            length: "Long"
        })

    const handleChange = (field, value) => field.onChange(value?.value)

    const promiseOptions = (inputValue, callback) => {
        suggestionAPI.getUniversalSuggestion(inputValue, callback)
    }

    const loadSuggestions = debounce(promiseOptions, 1000)

    const explanationFormat = {
        "Mixed": {
            header: t('explanation_mixed_format'),
            descriptions: [
                t('explanation_mixed_format_desc1'),
                t('explanation_mixed_format_desc2')
            ]
        },
        "Bullet List": {
            header: t('explanation_list_format'),
            descriptions: [
                t('explanation_list_format_desc1'),
                t('explanation_list_format_desc2')
            ]
        },
        "Paragraph": {
            header: t('explanation_paragraph_format'),
            descriptions: [
                t('explanation_paragraph_format_desc1'),
                t('explanation_paragraph_format_desc2')
            ]
        },
        "Custom": {
            header: t('explanation_custom_format'),
            descriptions: [
                t('explanation_custom_format_desc1'),
                t('explanation_custom_format_desc2')
            ]
        }
    };

    const explanationDetailed = {
        Detailed: {
            header: t('explanation_content_detailed'),
            descriptions: [
                t('explanation_content_detailed_desc1'),
                t('explanation_content_detailed_desc2')
            ]
        },
        Concise: {
            header: t('explanation_content_concise'),
            descriptions: [
                t('explanation_content_concise_desc1'),
                t('explanation_content_concise_desc2')
            ]
        }
    };

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

    const optionFormat = [
        { value: "Mixed", label: "Mixed" },
        { value: "List", label: "Bullet List" },
        { value: "Paragraph", label: "Paragraph" },
        { value: "Short Description", label: "Short Description" },
        { value: "Custom", label: "Custom" }
    ];

    const optionProficiencyUser = [
        { value: "Zero Knowledge", label: "Zero Knowledge" },
        { value: "Basic Understanding", label: "Basic Understanding" },
        { value: "Intermediate Knowledge", label: "Intermediate Knowledge" },
        { value: "Expert Knowledge", label: "Expert Knowledge" },
        { value: "Let Me Explain Myself", label: "Let Me Explain Myself" }
    ];

    const optionDetailed = [
        { value: "Detailed", label: "Detailed" },
        { value: "Concise", label: "Concise" }
    ];





    return (<div className="h-[90vh] overflow-hidden cs flex">
            <MaterialSidebar/>

            <div className="absolute w-full h-full lg:hidden">
                <div className="absolute left-0 top-5">
                    <SheetContentMobile type={"roadmap"}/>
                </div>
            </div>

            <ContentDistance className={"relative flex-1"}>

                <LabelTitleContent>

                    Generate Study Material

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
                                name="prior_knowledge"
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
                                name="output_format"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_format_material_head")}
                                        description={t("create_format_material_desc")}
                                        placeholder={optionFormat[0].label}
                                        explanation={explanationFormat}
                                        options={optionFormat}
                                        value={optionFormat[0].value}
                                    />

                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content_depth"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_detail_material_head")}
                                        description={t("create_detail_material_desc")}
                                        placeholder={optionDetailed[0].label}
                                        explanation={explanationDetailed}
                                        options={optionDetailed}
                                        value ={optionDetailed[0].value}
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
                                            Generate Material
                                        </Button>

                                    </div>
                                )
                        }

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="subject"*/}
                        {/*    render={({field}) => (<FormItem>*/}
                        {/*            <FormLabel>What Subject you interested in?</FormLabel>*/}
                        {/*            <FormControl>*/}
                        {/*                <Input placeholder="Mathematic" {...field} />*/}
                        {/*            </FormControl>*/}
                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}

                        {/*    )}*/}
                        {/*/>*/}

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="topic"*/}

                        {/*    render={({field}) => (<FormItem>*/}
                        {/*        <FormLabel>Topic</FormLabel>*/}
                        {/*        <FormControl>*/}
                        {/*            <AsyncCreatableSelect allowCreateWhileLoading={true}*/}
                        {/*                                  onChange={(value) => handleChange(field, value)} cacheOptions*/}
                        {/*                                  defaultOptions*/}
                        {/*                                  loadOptions={loadSuggestions}/>*/}
                        {/*        </FormControl>*/}
                        {/*        <FormMessage/>*/}
                        {/*    </FormItem>)}*/}
                        {/*/>*/}

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="prior_knowledge"*/}
                        {/*    render={({field}) => (<FormItem>*/}
                        {/*            <FormLabel>Prior Knowledge</FormLabel>*/}
                        {/*            <FormControl>*/}
                        {/*                <Input  placeholder="The user has a basic understanding of plant biology, including concepts like cells and energy, but is unfamiliar with the details of photosynthesis." {...field} />*/}
                        {/*            </FormControl>*/}
                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}

                        {/*    )}*/}
                        {/*/>*/}

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="content_depth"*/}
                        {/*    render={({field}) => (<FormItem>*/}
                        {/*            <FormLabel>Content Depth</FormLabel>*/}
                        {/*            <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                        {/*                <FormControl>*/}
                        {/*                    <SelectTrigger>*/}
                        {/*                        <SelectValue placeholder="Content Depth"/>*/}
                        {/*                    </SelectTrigger>*/}
                        {/*                </FormControl>*/}
                        {/*                <SelectContent>*/}
                        {/*                    <SelectItem value="Concise">Concise</SelectItem>*/}
                        {/*                    <SelectItem value="Detailed">Detailed</SelectItem>*/}
                        {/*                </SelectContent>*/}
                        {/*            </Select>*/}

                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}

                        {/*    )}*/}
                        {/*/>*/}

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="output_format"*/}
                        {/*    render={({field}) => (<FormItem>*/}
                        {/*            <FormLabel>Output Format</FormLabel>*/}
                        {/*            <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                        {/*                <FormControl>*/}
                        {/*                    <SelectTrigger>*/}
                        {/*                        <SelectValue placeholder="Output Format"/>*/}
                        {/*                    </SelectTrigger>*/}
                        {/*                </FormControl>*/}
                        {/*                <SelectContent>*/}
                        {/*                    <SelectItem value="Table">Table</SelectItem>*/}
                        {/*                    <SelectItem value="List">List</SelectItem>*/}
                        {/*                    <SelectItem value="Short Description">Short Description</SelectItem>*/}
                        {/*                    <SelectItem value="Paragraph">Paragraph</SelectItem>*/}
                        {/*                    <SelectItem value="Custom">Custom</SelectItem>*/}
                        {/*                </SelectContent>*/}
                        {/*            </Select>*/}

                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}

                        {/*    )}*/}
                        {/*/>*/}

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="style_customization"*/}
                        {/*    render={({field}) => (<FormItem>*/}
                        {/*            <FormLabel>Style Customization</FormLabel>*/}
                        {/*            <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                        {/*                <FormControl>*/}
                        {/*                    <SelectTrigger>*/}
                        {/*                        <SelectValue placeholder="Style Customization"/>*/}
                        {/*                    </SelectTrigger>*/}
                        {/*                </FormControl>*/}
                        {/*                <SelectContent>*/}
                        {/*                    <SelectItem value="Matching User Style">Matching User Style</SelectItem>*/}
                        {/*                    <SelectItem value="More Human-like">More Human-like</SelectItem>*/}
                        {/*                    <SelectItem value="Easier Language">Easier Language</SelectItem>*/}
                        {/*                    <SelectItem value="Professional Style">Professional Style</SelectItem>*/}
                        {/*                </SelectContent>*/}
                        {/*            </Select>*/}

                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}

                        {/*    )}*/}
                        {/*/>*/}

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="proficiency_level"*/}
                        {/*    render={({field}) => (<FormItem>*/}
                        {/*            <FormLabel>Proficiency Level</FormLabel>*/}
                        {/*            <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                        {/*                <FormControl>*/}
                        {/*                    <SelectTrigger>*/}
                        {/*                        <SelectValue placeholder="Proficiency Level"/>*/}
                        {/*                    </SelectTrigger>*/}
                        {/*                </FormControl>*/}
                        {/*                <SelectContent>*/}
                        {/*                    <SelectItem value="Beginner-Friendly">Beginner-Friendly</SelectItem>*/}
                        {/*                    <SelectItem value="Intermediate Level">Intermediate Level</SelectItem>*/}
                        {/*                    <SelectItem value="Expert Level">Expert Level</SelectItem>*/}
                        {/*                </SelectContent>*/}
                        {/*            </Select>*/}

                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}

                        {/*    )}*/}
                        {/*/>*/}

                        {/*<FormField*/}
                        {/*    control={form.control}*/}
                        {/*    name="length"*/}
                        {/*    render={({field}) => (<FormItem>*/}
                        {/*            <FormLabel>Material Length</FormLabel>*/}
                        {/*            <Select onValueChange={field.onChange} defaultValue={field.value}>*/}
                        {/*                <FormControl>*/}
                        {/*                    <SelectTrigger>*/}
                        {/*                        <SelectValue placeholder="Material Length"/>*/}
                        {/*                    </SelectTrigger>*/}
                        {/*                </FormControl>*/}
                        {/*                <SelectContent>*/}
                        {/*                    <SelectItem value="Ultra-Short">Ultra-Short</SelectItem>*/}
                        {/*                    <SelectItem value="Short">Short</SelectItem>*/}
                        {/*                    <SelectItem value="Medium">Medium</SelectItem>*/}
                        {/*                    <SelectItem value="Long">Long</SelectItem>*/}
                        {/*                </SelectContent>*/}
                        {/*            </Select>*/}

                        {/*            <FormMessage/>*/}
                        {/*        </FormItem>*/}

                        {/*    )}*/}
                        {/*/>*/}

                        {/*<Button type="submit">*/}
                        {/*    Submit*/}
                        {/*</Button>*/}
                    </form>
                </Form>
                {
                    isPending ? <LoadingGeneratingContent isPending={isPending} type="study"/> : <></>
                }

            </ContentDistance>


        </div>


    )
}