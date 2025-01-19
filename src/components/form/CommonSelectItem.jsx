import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import { useEffect, useState } from 'react';

export function CommonSelectItem({
                                     field,
                                     label,
                                     description,
                                     placeholder,
                                     options,
                                     explanation,
                                     value
                                 }) {

    const [selectedValue, setSelectedValue] = useState(field.value || placeholder);

    useEffect(() => {
        value === "Let Me Explain Myself" ? field.onChange() : field.onChange(value)
    }, []);

    const handleSelect = (item) => {
        field.onChange(item.value)
        setSelectedValue(item.value);

    };

    return (
        <div className="flex">
            <div className="bg-primary w-[1px] h-auto me-3"></div>
            <FormItem className="w-full">
                <FormLabel className={"font-medium text-primary"}>{label}</FormLabel>
                <FormDescription className={"text-[#C1C1C1]"}>{description}</FormDescription>
                <div className="flex gap-3 pt-2">
                    {options.map((item, i) => (
                        <div
                            key={i}
                            onClick={() => handleSelect(item)}
                            className={
                                `${selectedValue === item.value ? 'bg-primary text-white' : 'text-primary'} cursor-pointer w-fit px-4 py-1 border-[1px] border-primary text-xs font-medium rounded-full hover:bg-primary hover:text-white fade-in-70 transition`
                            }
                        >
                            {item.label}
                        </div>
                    ))}
                </div>

                {selectedValue === "Let Me Explain Myself" && (
                    <div className="pt-4">
                        <FormControl>
                            <Input placeholder="Please explain..." {...field} />
                        </FormControl>
                    </div>
                )}

                {explanation && selectedValue && (
                    <div>
                        <p>{selectedValue}: {explanation[selectedValue]?.header}</p>
                        {explanation[selectedValue]?.descriptions?.map((item, i) => (
                            <p key={i} className="text-xs">{item}</p>
                        ))}
                    </div>
                )}

                <FormMessage />
            </FormItem>
        </div>
    );
}

