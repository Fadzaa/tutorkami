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
import {api, makeResponseFailed} from "@/api/api.js";
import {RoadmapSidebar} from "@/components/sidebar/RoadmapSidebar.jsx";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {useNavigate} from "react-router-dom";
import {LoadingGeneratingContent} from "@/components/loading/LoadingGeneratingContent.jsx";
import {SheetContentMobile} from "@/components/content/SheetContentMobile.jsx";


const FormSchema = z.object({
    subject: z
        .string(),
    spesific_focus: z
        .string(),
    knowledge_level: z
        .string(),
    goal_level: z
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
                const res = await api.post("roadmap", body);
                console.log("Login Response:", res);
                return res;
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
            console.log("onError")
            console.log(error)


        },

        onMutate: async () => {

        },

    })


    const onSubmit = (data) => {
        mutate({...data})
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
                    List Roadmap
                </LabelTitleContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({field}) => (<FormItem>
                                    <FormLabel>What Subject you interested in?</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Mathematic" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="spesific_focus"
                            render={({field}) => (<FormItem>
                                <FormLabel>What Spesific do you want?</FormLabel>
                                <FormControl>
                                    <Input placeholder="Eg.c Linear Aljabar" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>)}
                        />
                        <FormField
                            control={form.control}
                            name="knowledge_level"
                            render={({field}) => (<FormItem>
                                    <FormLabel>What is your current level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Current Level"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Beginner">Beginner</SelectItem>
                                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                                            <SelectItem value="Expert">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="goal_level"
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