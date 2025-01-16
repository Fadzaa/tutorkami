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
import {useLoading} from "@/utils/global/LoadingProvider.jsx";
import {useSelector} from "react-redux";


const FormSchema = z.object({
    topic: z
        .string(),
    proficiency_level: z
        .string()

})

export function CreateLmsPage() {
    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })

    const loading = useSelector((state) => state.loading);
    const { fetchLMS } = useLoading();

    const onSubmit = (data) => {
        const { data: response, isLoading, isError } = fetchLMS("lms/start", data);
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
                                loading.isLoadingGlobal ?<Loading/>:"Submit"
                            }

                        </Button>
                    </form>
                </Form>

            </ContentDistance>


        </div>


    )
}