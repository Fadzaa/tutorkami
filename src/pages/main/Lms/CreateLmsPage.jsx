import {
    Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form.jsx"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select.jsx"
import {Input} from "@/components/ui/input.jsx"
import {Button} from "@/components/ui/button.jsx";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import {z} from "zod"
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {authAPI} from "@/api/auth.js";
import {tokenHandler} from "@/utils/tokenHandler.js";
import {api, makeResponseFailed} from "@/api/api.js";
import {RoadmapSidebar} from "@/components/sidebar/RoadmapSidebar.jsx";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";
import {LMSSidebar} from "@/components/sidebar/LMSSidebar.jsx";


const FormSchema = z.object({
    topic: z
        .string({
            required_error: "isi",
        }), proficiency_level: z
        .string({
            required_error: "Please select an email to display.",
        })

})

export function CreateLmsPage() {


    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })

    const navigate = useNavigate()

    const {mutate, isPending,} = useMutation({
        mutationKey: ["postLms"], mutationFn: async (body) => {
            try {
                console.log(body)
                const res = await api.post("lms/start", body);
                console.log("Lms Start:", res);
                return res;
            } catch (error) {
                return makeResponseFailed({
                    message: error,
                })
            }
        },

        onSuccess: (response) => {

            navigate("/tools/generative-lms");
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
            <LMSSidebar/>


            <ContentDistance className={"relative flex-1"}>

                <LabelTitleContent>

                    Generate Study LMS

                </LabelTitleContent>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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

                        <Button type="submit">

                            {
                                isPending ?<Loading/>:"Submit"
                            }

                        </Button>
                    </form>
                </Form>

            </ContentDistance>


        </div>


    )
}