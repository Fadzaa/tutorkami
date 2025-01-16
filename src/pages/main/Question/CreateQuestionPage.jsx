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

const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    total: z
        .string(),
    type: z
        .string(),
    question_difficulty: z
        .string(),
    target_audience: z
        .string(),

})

export function CreateQuestionPage() {


    //zod validation
    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })

    const navigate = useNavigate()

    const promiseOptions = (inputValue, callback) => {
        commonAPI.getSuggestion(inputValue, callback)
    }

    const loadSuggestions = debounce(promiseOptions, 1000)

    const {mutate, isPending,} = useMutation({
        mutationKey: ["postQuestion"],
        mutationFn: async (body) => await questionAPI.postQuestion(body),
        onSuccess: (response) => navigate("/tools/generative-question/detail/" + response.data.data.id),
        onError: (error) => console.log("onError: " + error)
    })


    const onSubmit = (data) => mutate({...data})

    const handleChange = (field,value) => field.onChange(value?.value)

    return (

        <div className="h-[90vh] overflow-auto cs flex">
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">


                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Subject</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mathematic" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="topic"

                            render={({field}) => (<FormItem>
                                <FormLabel>Total Questions</FormLabel>
                                <FormControl>
                                    <AsyncCreatableSelect allowCreateWhileLoading={true} onChange={(value)=> handleChange(field,value)}   cacheOptions defaultOptions
                                                           loadOptions={loadSuggestions}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>)}
                        />

                        <FormField
                            control={form.control}
                            name="total"

                            render={({field}) => (<FormItem>
                                <FormLabel>Total Questions</FormLabel>
                                <FormControl>
                                    <Input type={'number'} placeholder="Total Question" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>)}
                        />

                        <FormField
                            control={form.control}
                            name="type"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Question Type</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Question Type"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                                            <SelectItem value="Fill-in-the-Blank">Fill In The Blank</SelectItem>
                                            <SelectItem value="True/False">True-False</SelectItem>
                                            <SelectItem value="Short Answer">Short Answer</SelectItem>
                                            <SelectItem value="Mixed">Short Answer</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="question_difficulty"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Difficult</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Question Difficult"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Mixed">Mixed</SelectItem>
                                            <SelectItem value="Single">Single</SelectItem>
                                            <SelectItem value="Progressive">Progressive</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="target_audience"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Target Audience</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Target Audience"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="High School">High School</SelectItem>
                                            <SelectItem value="College Student">College Student</SelectItem>
                                            <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                                            <SelectItem value="General">General</SelectItem>
                                            <SelectItem value="Professional">Professional</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />


                        <Button type="submit">
                            Submit
                        </Button>
                    </form>
                </Form>

                {isPending ? <LoadingGeneratingContent isPending={isPending} type={"question"}/> : <></>}

            </ContentDistance>


        </div>


    )
}