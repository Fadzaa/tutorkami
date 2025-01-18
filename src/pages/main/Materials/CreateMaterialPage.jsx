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

const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    prior_knowledge: z
        .string().default("The user has a basic understanding of plant biology, including concepts like cells and energy, but is unfamiliar with the details of photosynthesis"),
    content_depth: z
        .string(),
    output_format: z
        .string(),
    style_customization: z
        .string(),
    proficiency_level: z
        .string(),
    length: z
        .string(),
})




export function CreateMaterialPage() {

    const navigate = useNavigate()
    const {toast} = useToast()
    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    })

    const promiseOptions = (inputValue, callback) => {
        suggestionAPI.getUniversalSuggestion(inputValue, callback)
    }

    const loadSuggestions = debounce(promiseOptions, 1000)

    const {mutate, isPending,} = useMutation({
        mutationFn: async (body) => await materialAPI.postMaterial(body),
        onSuccess: (response) => {
            toast({
                title: "Create Material Success",
                description: "You have successfully create material.",
            })
            console.log("halo:" + response.data.data.id)
            navigate("/tools/generative-material/detail/" + response.data.data.id);
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Create Material Failed",
                description: "Failed create material.",
            })
            console.log("onError: " + error)
        },
    })

    const onSubmit = (data) => mutate({...data, language: langHandler.get() === "id" ? "Indonesian" : "English"})

    const handleChange = (field, value) => field.onChange(value?.value)
    return (<div className="h-[90vh] overflow-auto cs flex">
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
                            name="topic"

                            render={({field}) => (<FormItem>
                                <FormLabel>Topic</FormLabel>
                                <FormControl>
                                    <AsyncCreatableSelect allowCreateWhileLoading={true}
                                                          onChange={(value) => handleChange(field, value)} cacheOptions
                                                          defaultOptions
                                                          loadOptions={loadSuggestions}/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>)}
                        />

                        <FormField
                            control={form.control}
                            name="prior_knowledge"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Prior Knowledge</FormLabel>
                                    <FormControl>
                                        <Input  placeholder="The user has a basic understanding of plant biology, including concepts like cells and energy, but is unfamiliar with the details of photosynthesis." {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="content_depth"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Content Depth</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Content Depth"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Concise">Concise</SelectItem>
                                            <SelectItem value="Detailed">Detailed</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="output_format"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Output Format</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Output Format"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Table">Table</SelectItem>
                                            <SelectItem value="List">List</SelectItem>
                                            <SelectItem value="Short Description">Short Description</SelectItem>
                                            <SelectItem value="Paragraph">Paragraph</SelectItem>
                                            <SelectItem value="Custom">Custom</SelectItem>
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
                                    <FormLabel>Style Customization</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Style Customization"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Matching User Style">Matching User Style</SelectItem>
                                            <SelectItem value="More Human-like">More Human-like</SelectItem>
                                            <SelectItem value="Easier Language">Easier Language</SelectItem>
                                            <SelectItem value="Professional Style">Professional Style</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="proficiency_level"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Proficiency Level</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Proficiency Level"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Beginner-Friendly">Beginner-Friendly</SelectItem>
                                            <SelectItem value="Intermediate Level">Intermediate Level</SelectItem>
                                            <SelectItem value="Expert Level">Expert Level</SelectItem>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage/>
                                </FormItem>

                            )}
                        />

                        <FormField
                            control={form.control}
                            name="length"
                            render={({field}) => (<FormItem>
                                    <FormLabel>Material Length</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Material Length"/>
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="Ultra-Short">Ultra-Short</SelectItem>
                                            <SelectItem value="Short">Short</SelectItem>
                                            <SelectItem value="Medium">Medium</SelectItem>
                                            <SelectItem value="Long">Long</SelectItem>
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
                    isPending ? <LoadingGeneratingContent isPending={isPending} type="study"/> : <></>
                }

            </ContentDistance>


        </div>


    )
}