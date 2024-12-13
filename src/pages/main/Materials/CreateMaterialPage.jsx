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
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {LabelTitleContent} from "@/components/ui/label-title-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {useNavigate} from "react-router-dom";
import {MaterialSidebar} from "@/components/sidebar/MaterialSidebar.jsx";


// const FormSchema = z.object({
//     subject: z
//         .string({
//             required_error: "isi",
//         }), spesific_focus: z
//         .string({
//             required_error: "isi",
//         }), knowledge_level: z
//         .string({
//             required_error: "Please select an email to display.",
//         }), goal_level: z
//         .string({
//             required_error: "Please select an email to display.",
//         })
//
// })

export function CreateMaterialPage() {


    const form = useForm()


    const navigate = useNavigate()


    const {mutate, isPending,} = useMutation({
        mutationKey: ["postMaterial"], mutationFn: async (body) => {
            try {
                const res = await api.post("material", body);
                console.log("Login Response:", res);
                return res;
            } catch (error) {
                return makeResponseFailed({
                    message: error,
                })
            }
        },

        onSuccess: (response) => {
            console.log("halo:" + response.data.data.id)
            navigate("/tools/generative-material/detail/" + response.data.data.id);
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
            <MaterialSidebar/>


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
                                        <Input placeholder="Mathematic" {...field} />
                                    </FormControl>
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