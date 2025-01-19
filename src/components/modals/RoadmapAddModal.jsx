import {useState} from "react";
import Modal from "./Modal";
import { useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import useRoadmapsModal from "@/hooks/use-roadmap-modal.js";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import ReferenceForm from "@/components/ui/reference-form.jsx";

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

const AiForm = z.object({
    goal: z.string(),
});

const RoadmapAddModal = ({update,update2}) => {

    const [ai, setAi] = useState(true);
    const roadmapModal = useRoadmapsModal();

    const formManual = useForm({
        resolver: zodResolver(ManualForm), mode: "all",
    });

    const formAi = useForm({
        resolver: zodResolver(AiForm),
        mode: "all",
    });

    const onSubmit = async () => {
        if (ai) {
            if (formAi.getValues().goal !== undefined) {
                update({...formAi.getValues(), update_type: "AI"})
                formAi.reset()
                roadmapModal.onClose()
            }
        } else {
            update2({...formManual.getValues(), update_type: "Add"})
            formManual.reset()
            roadmapModal.onClose();
        }
    };

    const Tabbar = () => {
        return (
            <div className="flex gap-3 w-full justify-center py-2">
                <div
                    onClick={() => setAi(true)}
                    className={`border w-full hover:bg-[#1E293B] hover:text-white justify-center flex gap-2 rounded-3xl py-0.5 px-3 transition-all duration-300 ${
                        ai ? "bg-[#1E293B] text-white" : "border-[#1E293B] text-black"
                    }`}
                >
                    Generate By AI
                </div>
                <div
                    onClick={() => setAi(false)}
                    className={`border w-full justify-center hover:bg-[#1E293B] hover:text-white flex gap-2 rounded-3xl py-0.5 px-3 transition-all duration-300 ${
                        !ai ? "bg-[#1E293B] text-white" : "border-[#1E293B] text-black"
                    }`}
                >
                    Manual Input
                </div>
            </div>
        );
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
                <ReferenceForm control={formManual.control}/>
            </div>
        );
    }

    const InputAi = () => {
        return (
            <div className="flex-col gap-3 w-full justify-center py-2">
                <FormField
                    control={formAi.control}
                    name="goal"
                    render={({field}) => (<FormItem>
                            <FormLabel>What Goal you want to achieve ?</FormLabel>
                            <FormControl>
                                <Input placeholder="Goal" {...field} />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>

                    )}
                />
            </div>
        );
    }

    let content = (
        <>
            <Tabbar/>
            {
                ai ? <InputAi/> : <InputManual/>
            }
        </>
    )


    {
        return (
            <Form {...(ai ? formAi : formManual)}>
                <form onSubmit={ai ? formAi.handleSubmit(onSubmit) : formManual.handleSubmit(onSubmit)} className="space-y-8">
                    <Modal
                        progress={0}
                        isOpen={roadmapModal.isOpen}
                        onClose={roadmapModal.onClose}
                        onSubmit={onSubmit}
                        title="Add Another Step"
                        actionLabel={"Add"}
                        body={content}
                        isEasyInOut={true}
                    />
                </form>
            </Form>
    )
}
};

export default RoadmapAddModal;
