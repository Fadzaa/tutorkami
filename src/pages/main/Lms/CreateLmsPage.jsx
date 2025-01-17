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


const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    difficulty: z
        .string(),
    proficiency_level: z
        .string(),
    length: z
        .string(),
    long_loading: z
        .boolean(),

})

export function CreateLmsPage() {
    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })
    const {fetchLMS} = useLoading();
    const navigate = useNavigate()

    const loading = useSelector((state) => state.loading);
    const onSubmit = () => {
        fetchLMS("lms/start", {...form.getValues(), language: langHandler.get() === "id" ? "Indonesian" : "English"}, () => navigate("/tools/generative-lms/"))
    };

    return (
        <div className="h-[90vh] overflow-hidden flex">
            <LMSSidebar/>

            <ContentDistance className={"relative flex-1"}>

                <LabelTitleContent>

                    Generate Study LMS

                </LabelTitleContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (<FormItem>
                                    <FormLabel>What Subject you interested in?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Data Science" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="topic"
                            render={({field}) => (<FormItem>
                                    <FormLabel>What Topic you interested in?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Machine Learning" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="difficulty"
                            render={({field}) => (<FormItem>
                                <FormLabel>What difficulty you prefer</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Difficulty Level"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Beginner-Friendly">Beginner Friendly</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>)}
                        />

                        <FormField
                            control={form.control}
                            name="proficiency_level"
                            render={({field}) => (<FormItem>
                                <FormLabel>What proficiency you prefer</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Proficieny Level"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>)}
                        />

                        <FormField
                            control={form.control}
                            name="length"
                            render={({field}) => (<FormItem>
                                <FormLabel>What length you prefer for your content</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Length Content"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Concise">Concise</SelectItem>
                                        <SelectItem value="Detailed">Detailed</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>)}
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

                        <Button type="submit">

                            {
                                loading.isLoadingGlobal ?<Loading/>:"Submit"
                            }

                        </Button>
                    </form>
                </Form>

            </ContentDistance>


        </div>


    )
}