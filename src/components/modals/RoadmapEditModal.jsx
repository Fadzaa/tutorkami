import {useEffect, useState} from "react";
import Modal from "./Modal";
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import useRoadmapsModal from "@/hooks/use-roadmap-modal.js";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import ReferenceForm from "@/components/ui/reference-form.jsx";
import useRoadmapsUpdateModal from "@/hooks/use-roadmap-update-modal.js";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Button} from "@/components/ui/button.jsx";
import {langHandler} from "@/lib/langHandler.js";

const ManualForm = z.object({
    title: z.string(),
    desc: z.string(),
    detail_desc: z.string(),
    reference: z.array(
        z.object({
            title: z.string().nonempty("Title is required"),
            type: z.string().nonempty("Type is required"),
            url: z.string().nonempty("Url is required"),
        })
    ).nonempty("Reference is required"),
});

const RoadmapEditModal = ({update,data,id}) => {

    const roadmapModal = useRoadmapsUpdateModal();

    const formManual = useForm({
        resolver: zodResolver(ManualForm), mode: "all",
        defaultValues: {
            title: data.title,
            desc: data.desc,
            detail_desc: data.detail_desc,
            reference: data.references,
        },
    });

    const onSubmit = () => {
        update({body: {...formManual.getValues(), update_type: "Update"}, id: id})
        formManual.reset()
        roadmapModal.onClose();
    }

    const InputManual = () => {
        return (
            <div className="flex flex-col gap-4 w-full justify-center py-2">
                <FormField
                    control={formManual.control}
                    name="title"
                    render={({field}) => (<FormItem>
                            <FormLabel>What Title you want ?</FormLabel>
                            <FormControl>
                                <Input placeholder="Title" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>

                    )}
                />
                <FormField
                    control={formManual.control}
                    name="desc"
                    render={({field}) => (<FormItem>
                            <FormLabel>What Desc you want ?</FormLabel>
                            <FormControl>
                                <Input placeholder="Desc" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>

                    )}
                />
                <FormField
                    control={formManual.control}
                    name="detail_desc"
                    render={({field}) => (<FormItem>
                            <FormLabel>What Detail Desc you want ?</FormLabel>
                            <FormControl>
                                <Input placeholder="Detail Desc" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>

                    )}
                />
                <div className={`flex flex-col gap-3`}>
                    <FormLabel>References</FormLabel>
                    {formManual.getValues().reference.map((field, index) => (
                        <div key={field.id} className="flex gap-4 mb-4">
                            <FormField
                                control={formManual.control}
                                name={`reference.${index}.title`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Reference Title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formManual.control}
                                name={`reference.${index}.type`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Type</FormLabel>
                                        <FormControl>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select Type" value={field.value} readOnly />
                                                </SelectTrigger>
                                                <SelectContent>
                                                        <SelectItem value={"Book"}>
                                                            Book
                                                        </SelectItem>
                                                        <SelectItem value={"Website"}>
                                                            Website
                                                        </SelectItem>
                                                        <SelectItem value={"Video"}>
                                                            Video
                                                        </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={formManual.control}
                                name={`reference.${index}.url`}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>URL</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Reference URL" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    let content = (
        <>
            <InputManual/>
        </>
    )


    {
        return (
            <Form {...(formManual)}>
                <form onSubmit={formManual.handleSubmit(onSubmit)} className="space-y-8">
                    <Modal
                        progress={0}
                        isOpen={roadmapModal.isOpen}
                        onClose={roadmapModal.onClose}
                        onSubmit={onSubmit}
                        title="Edit Step"
                        actionLabel={"Edit"}
                        body={content}
                        isEasyInOut={true}
                    />
                </form>
            </Form>
    )
}
};

export default RoadmapEditModal;
