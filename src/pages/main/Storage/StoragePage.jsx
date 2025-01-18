import {format} from "date-fns";
import {useEffect, useState} from "react";
import {CalendarIcon} from "lucide-react"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Calendar} from "@/components/ui/calendar"
import {
    Popover, PopoverContent, PopoverTrigger,
} from "@/components/ui/popover"
import {useQuery} from "@tanstack/react-query";
import {cn} from "@/lib/utils.js";
import {Button} from "@/components/ui/button.jsx";
import {useDebounce} from "use-debounce";
import {StorageContent} from "@/components/content/StorageContent.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {storageAPI} from "@/api/storage.js";
import {StorageSkeleton} from "@/components/skeleton/StorageSkeleton.jsx";

export function StoragePage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('')
    const [type, setType] = useState('')
    const [language, setLanguage] = useState('')


    const [debounceValue] = useDebounce(search, 2000)
    const [date, setDate] = useState(undefined)

    const {isLoading, data, refetch} = useQuery({
        queryKey: ["getStorageLms"],
        queryFn: async () => {
            return storageAPI.getStorage({
                search: debounceValue,
                page: page,
                language: language,
                type: type,
                start_date: date?.from ? format(date?.from, "yyyy-MM-dd 00:00:00") : date?.from,
                    end_date: date?.to ? format(date?.to, "yyyy-MM-dd 23:59:59") : date?.to,
            })
        },
    });


    useEffect(() => {
        refetch()
    }, [debounceValue, language, type, date, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= last_page) {
            setPage(newPage);
        }
    };
    if (isLoading) {
        return <StorageSkeleton/>;
    }


    const {current_page, last_page, data: storageData, next_page_url, prev_page_url} = data.data.data;


    return (<div>
            <h1 className="px-5 mt-5 font-medium text-xl">List Lms</h1>


            <div className={'flex gap-4 mx-4 mt-5'}>

                <Input type={'text'} onChange={(e) => setSearch(e.target.value)} value={search}
                       placeholder={`Search for Subject`}/>
                <Select onValueChange={(value) => setType(value)}>
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem defaultValue>Type</SelectItem>
                        <SelectItem value={"Question"}>Question</SelectItem>
                        <SelectItem value={"Material"}>Material</SelectItem>
                        <SelectItem value={"Roadmap"}>Roadmap</SelectItem>
                        <SelectItem value={"LMS"}>Lms</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setLanguage(value)}>
                    <SelectTrigger>
                        <SelectValue/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem defaultValue>Language Storage</SelectItem>
                        <SelectItem value="Indonesian">Indonesia</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                    </SelectContent>
                </Select>

                <div className={"w-full"}>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                id="date"
                                variant={"outline"}
                                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                            >
                                <CalendarIcon/>
                                {date?.from ? (date.to ? (<>
                                            {format(date.from, "LLL dd, y")} -{" "}
                                            {format(date.to, "LLL dd, y")}
                                        </>) : (format(date.from, "LLL dd, y"))) : (<span>Pick a date</span>)}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full" align="start">
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={date?.from}
                                selected={date}
                                onSelect={setDate}
                                numberOfMonths={2}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

            </div>


            <StorageContent current_page={current_page}
                            last_page={last_page}
                            data={storageData}
                            next_page_url={next_page_url}
                            prev_page_url={prev_page_url}
                            handlePageChange={handlePageChange}/>
        </div>);
}
