import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form.jsx"
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


const FormSchema = z.object({
    subject: z
        .string(),
    goal: z
        .string(),
    user_proficiency_level: z
        .string(),
    depth_of_topics: z
        .string(),
    style_customization: z
        .string(),
    timeline: z
        .string()
})

export function CreateRoadmapPage() {


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

        },

        onMutate: async () => {

        },

    })


    const onSubmit = (data) => {
        mutate({...data, language: langHandler.get() === "id" ? "Indonesian" : "English"})
    }


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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (<FormItem>
                                    <FormLabel>What Subject you interested in?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Python Programming" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="goal"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Insert Your Learning Goal or Outcome</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Become proficient in writing Python scripts for data analysis" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="user_proficiency_level"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Insert Your Understanding Level</FormLabel>
                                    <FormControl>
                                        <Input placeholder="The user has basic knowledge of Python syntax (e.g., variables, loops, and functions) but has no experience with libraries like Pandas or using Python for data analysis." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="depth_of_topics"
                            render={({field}) => (<FormItem>
                                    <FormLabel>What Depth of Topics you prefer ?</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Detailed Breakdown"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="High-Level-Overview">High Level Overview</SelectItem>
                                            <SelectItem value="Detailed-Breakdown">Detailed Breakdown</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="style_customization"
                            render={({field}) => (<FormItem>
                                <FormLabel>What Style Customization you prefer ?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Style Customization"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="More-Human-Like">More Human Like</SelectItem>
                                        <SelectItem value="Easier-Language">Easier Language</SelectItem>
                                        <SelectItem value="Professional-Style">Professional Style</SelectItem>
                                    </SelectContent>
                                </Select>

                                <FormMessage/>
                            </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="timeline"
                            render={({field}) => (<FormItem>
                                <FormLabel>What timeline you prefer ?</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Timeline"/>
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Short-Term">Short Term</SelectItem>
                                        <SelectItem value="Medium-Term">Medium Term</SelectItem>
                                        <SelectItem value="Long-Term">Long Term</SelectItem>
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

                {
                    isPending ? <LoadingGeneratingContent isPending={isPending} type="roadmap"/> : <></>
                }

            </ContentDistance>


        </div>


    )
}