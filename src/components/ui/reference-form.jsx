import {useFieldArray} from "react-hook-form";
import {useState} from "react";
import {FormField, FormItem, FormLabel, FormControl, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectTrigger, SelectContent, SelectItem, SelectValue} from "@/components/ui/select";

const ReferenceForm = ({control}) => {
    const {fields, append, remove} = useFieldArray({
        control,
        name: "reference",
    });

    const [availableTypes, setAvailableTypes] = useState(["Book", "Web"]);


    return (
        <div className={`flex flex-col gap-3`}>
            <FormLabel>References</FormLabel>
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-4 mb-4">
                    <FormField
                        control={control}
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
                        control={control}
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
                                            {availableTypes.map((type) => (
                                                <SelectItem key={type} value={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={control}
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
                    <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-8"
                        variant="destructive"
                    >
                        Remove
                    </Button>
                </div>
            ))}
            {fields.length < 2 && (
                <Button
                    type="button"
                    onClick={() =>
                        append({
                            title: "",
                            type: "",
                            url: "",
                        })
                    }
                >
                    Add Reference
                </Button>
            )}
        </div>
    );
};

export default ReferenceForm;
