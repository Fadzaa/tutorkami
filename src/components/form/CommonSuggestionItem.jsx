import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form.jsx";
import {Input} from "@/components/ui/input.jsx";
import AsyncCreatableSelect from "react-select/async-creatable";

export function CommonSuggestionItem({field, label, description, placeholder, suggestion, loadSuggestions, handleChange}) {
    return (
        <div className="flex">
            <div className="bg-primary w-[1px] h-auto me-3"></div>

            <FormItem className="w-full">
                <FormLabel className={"font-medium text-primary"}>{label}</FormLabel>
                <FormDescription className={"text-[#C1C1C1]"}>{description}</FormDescription>
                <FormControl>
                    <AsyncCreatableSelect
                        allowCreateWhileLoading={true}
                        onChange={handleChange}
                        cacheOptions
                        defaultOptions
                        loadOptions={loadSuggestions}
                    />
                </FormControl>
                {/*<div className="flex gap-3 pt-2">*/}
                {/*    {suggestion.map((item, i) => (*/}
                {/*        <div*/}
                {/*            onClick={() => field.onChange(item)}*/}
                {/*            className="cursor-pointer w-fit px-4 py-1 border-[1px] border-primary text-primary text-xs font-medium rounded-full hover:bg-primary hover:text-white fade-in-70 transition">{item}*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}
                <FormMessage/>
            </FormItem>
        </div>
    )
}