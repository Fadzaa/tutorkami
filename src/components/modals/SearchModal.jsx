import qs from "query-string";
import useRegenerateModel from "@/hooks/use-regenerate-modal.js";
import { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import { Slider } from "@mantine/core";
import { CSSTransition } from "react-transition-group";
import Heading from "../Heading.jsx";
import { RxCross2 } from "react-icons/rx";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import AsyncCreatableSelect from "react-select/async-creatable";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";
import { useNavigate } from "react-router-dom";
import { commonAPI } from "@/api/common.js";
import debounce from "lodash.debounce";
import { useMutation } from "@tanstack/react-query";
import { questionAPI } from "@/api/question.js";

// Define steps
const STEPS = {
    FIRST: 0,
    SECOND: 1,
    THIRD: 2,
};

// Validation schema
const FormSchema = z.object({
    subject: z.string().nonempty("Subject is required"),
    topic: z.string().nonempty("Topic is required"),
    total: z.string().nonempty("Total questions is required"),
    type: z.string().nonempty("Question type is required"),
    question_difficulty: z.string().nonempty("Difficulty level is required"),
    target_audience: z.string().nonempty("Target audience is required"),
});

const SearchModal = () => {
    const searchModal = useRegenerateModel();
    const navigate = useNavigate();

    const [step, setStep] = useState(STEPS.FIRST);
    const [progress, setProgress] = useState(4);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        mode: "all",
    });

    const onBack = useCallback(() => {
        setStep((prev) => prev - 1);
        setProgress((prev) => prev - 35);
    }, []);

    const onNext = useCallback(() => {
        setStep((prev) => prev + 1);
        setProgress((prev) => prev + 35);
    }, []);

    const promiseOptions = (inputValue, callback) => {
        commonAPI.getSuggestion(inputValue, callback);
    };

    const loadSuggestions = debounce(promiseOptions, 1000);

    const { mutate } = useMutation({
        mutationKey: ["postQuestion"],
        mutationFn: async (body) => await questionAPI.postQuestion(body),
        onSuccess: (response) =>
            navigate("/tools/generative-question/detail/" + response.data.data.id),
        onError: (error) => console.log("Error: " + error),
    });

    const handleChange = (field, value) => field.onChange(value?.value);

    const onSubmit = useCallback(async () => {
        if (step !== STEPS.THIRD) {
            return onNext();
        }
        const data = form.getValues();
        mutate({ ...data });
        searchModal.onClose();
    }, [step, searchModal, onNext, form, mutate]);

    const actionLabel = useMemo(() => (step === STEPS.THIRD ? "Search" : "Next"), [
        step,
    ]);

    const secondaryActionLabel = useMemo(
        () => (step === STEPS.FIRST ? undefined : "Back"),
        [step]
    );

    // Step-specific content
    let bodyContent;
    switch (step) {
        case STEPS.SECOND:
            bodyContent = (
                <div className="flex flex-col gap-6">
                    <Heading title="Specify your search" />

                    <FormField
                        control={form.control}
                        name="total"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Total Questions</FormLabel>
                                <FormControl>
                                    <Input type="number" placeholder="Total Questions" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Question Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Question Type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Multiple Choice">Multiple Choice</SelectItem>
                                        <SelectItem value="Fill-in-the-Blank">Fill In The Blank</SelectItem>
                                        <SelectItem value="True/False">True/False</SelectItem>
                                        <SelectItem value="Short Answer">Short Answer</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
            break;

        case STEPS.THIRD:
            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading title="Finalize Your Search" subtitle="Select additional options" />

                    <FormField
                        control={form.control}
                        name="question_difficulty"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Difficulty</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={'Mixed'}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Difficulty Level" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Mixed">Mixed</SelectItem>
                                        <SelectItem value="Single">Single</SelectItem>
                                        <SelectItem value="Progressive">Progressive</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="target_audience"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Target Audience</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={'High School'}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Target Audience" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="High School">High School</SelectItem>
                                        <SelectItem value="College Student">College Student</SelectItem>
                                        <SelectItem value="General">General</SelectItem>
                                        <SelectItem value="Professional">Professional</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
            break;

        default:
            bodyContent = (
                <div className="flex flex-col gap-8">
                    <Heading
                        title="Rise and grind!"
                        subtitle="Find a study spot nearby"
                    />
                    <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                    <Input placeholder="Mathematics" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="topic"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Topic</FormLabel>
                                <FormControl>
                                    <AsyncCreatableSelect
                                        allowCreateWhileLoading
                                        onChange={(value) => handleChange(field, value)}
                                        cacheOptions
                                        defaultOptions
                                        loadOptions={loadSuggestions}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            );
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Modal
                    progress={progress}
                    isOpen={searchModal.isOpen}
                    onClose={searchModal.onClose}
                    onSubmit={onSubmit}
                    title="Filters"
                    actionLabel={actionLabel}
                    secondaryActionLabel={secondaryActionLabel}
                    secondaryAction={step === STEPS.FIRST ? undefined : onBack}
                    body={bodyContent}
                />
            </form>
        </Form>
    );
};

export default SearchModal;
