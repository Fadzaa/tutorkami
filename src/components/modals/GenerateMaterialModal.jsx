import {useCallback, useEffect, useMemo, useState} from "react";
import Modal from "./Modal";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {useNavigate} from "react-router-dom";
import {useMutation} from "@tanstack/react-query";
import {questionAPI} from "@/api/question.js";
import  useMaterialModal from "@/hooks/use-material-modal.js";
import {cn} from "@/lib/utils.js";
import useQuestionModal from "@/hooks/use-question-modal.js";
import {Button} from "@/components/ui/button.jsx";
import {Close} from "@mui/icons-material";
import {Check} from "lucide-react";
import useRoadmapsModal from "@/hooks/use-roadmap-modal.js";
import useRoadmapRegenerateModal from "@/hooks/use-roadmap-regenerate-modal.js";
import useMaterialGenerateQuizModal from "@/hooks/use-material-generate-quiz-modal.js";
import {Form, FormField} from "@/components/ui/form.jsx";
import {CommonFormItem} from "@/components/form/CommonFormItem.jsx";
import {CommonSelectItem} from "@/components/form/CommonSelectItem.jsx";
import {useTranslation} from "react-i18next";
import useGenerateMaterialModal from "@/hooks/use-generate-material-modal.js";
import {langHandler} from "@/lib/langHandler.js";
import {materialAPI} from "@/api/material.js";
import {toast} from "@/hooks/use-toast.js";

// Validation schema
const FormSchema = z.object({
    subject: z
        .string(),
    topic: z
        .string(),
    prior_knowledge: z
        .string(),
    content_depth: z
        .string(),
    output_format: z
        .string()
})

const GenerateMaterialModal = ({subject, topic}) => {
    const {t} = useTranslation()
    const modal = useGenerateMaterialModal();

    const navigate = useNavigate();

    const form = useForm({
        resolver: zodResolver(FormSchema), mode: "all",
    });

    const {mutate, isPending,} = useMutation({
        mutationKey: ["postMaterial"],
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
            console.log(error)
        },
    })

    const onSubmit = () => {
        const formData = form.getValues();
        console.log(formData)
        mutate({
            ...formData,
            subject: subject,
            topic: topic,
            prior_knowledge: "General",
            proficiency_level: "Intermediate Level",
            style_customization : "Professional Style",
            length: "Long",
            language: langHandler.get() === "id" ? "Indonesian" : "English"
        })
    }

    const optionFormat = [
        { value: "Mixed", label: "Mixed" },
        { value: "List", label: "Bullet List" },
        { value: "Paragraph", label: "Paragraph" },
        { value: "Short Description", label: "Short Description" },
        { value: "Custom", label: "Custom" }
    ];


    const optionDetailed = [
        { value: "Detailed", label: "Detailed" },
        { value: "Concise", label: "Concise" }
    ];

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <Modal
                    progress={0}
                    isOpen={modal.isOpen}
                    onClose={modal.onClose}
                    onSubmit={onSubmit}
                    title="Material Generate"
                    actionLabel={"Generate Quiz"}
                    regenerateLoading={isPending}
                    disabled={
                        false
                    }
                    body={
                        <>
                            <FormField
                                control={form.control}
                                name="output_format"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_format_material_head")}
                                        description={t("create_format_material_desc")}
                                        placeholder={optionFormat[0].label}
                                        explanation={null}
                                        options={optionFormat}
                                        value={optionFormat[0].value}
                                    />

                                )}
                            />
                            <FormField
                                control={form.control}
                                name="content_depth"
                                render={({field}) => (
                                    <CommonSelectItem
                                        field={field}
                                        label={t("create_detail_material_head")}
                                        description={t("create_detail_material_desc")}
                                        placeholder={optionDetailed[0].label}
                                        explanation={null}
                                        options={optionDetailed}
                                        value={optionDetailed[0].value}
                                    />

                                )}
                            />
                        </>
                    }
                />
            </form>
        </Form>
    );
};

export default GenerateMaterialModal;
