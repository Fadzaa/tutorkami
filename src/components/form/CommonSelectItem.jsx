import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {useEffect} from "react";

export function CommonSelectItem({field, label, description, placeholder, options, explanation}) {
    field.value = field.value || placeholder;

    useEffect(() => {
        field.onChange(placeholder)
    }, []);
    return (

        <div className="flex">
            <div className="bg-primary w-[1px] h-auto me-3"></div>
            <FormItem className="w-full">
                <FormLabel className={"font-medium text-primary"}>{label}</FormLabel>
                <FormDescription className={"text-[#C1C1C1]"}>{description}</FormDescription>
                <div className="flex gap-3 pt-2">
                    {options.map((item, i) => (
                        <div
                            onClick={() => field.onChange(item)}
                            className={
                            `${field.value === item ? 'bg-primary text-white' : 'text-primary'} cursor-pointer w-fit px-4 py-1 border-[1px] border-primary text-primary text-xs font-medium rounded-full hover:bg-primary hover:text-white fade-in-70 transition`
                            }>{item}
                        </div>
                    ))}
                </div>
                {
                    field.value === "Let Me Explain Myself" && (

                        <div className="pt-4">
                            <FormControl>
                                <Input placeholder={placeholder} {...field} />
                            </FormControl>
                        </div>
                    )

                }

                {
                    explanation && (
                        <div>
                            <p>{field.value}: {explanation[field.value]["header"]}</p>
                            {
                                explanation[field.value]["descriptions"].map((item, i) => (
                                    <p className="text-xs">{item}</p>
                                ))
                            }

                        </div>
                    )
                }

                <div></div>

                <FormMessage/>
            </FormItem>
        </div>
    )
}

