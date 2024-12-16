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

export function StorageMaterialPage() {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('')
    const [current, setCurrent] = useState('')
    const [goal, setGoal] = useState('')
    const [debounceValue] = useDebounce(search, 2000)
    const [date, setDate] = useState(undefined)

    const {isLoading, data, refetch,isPending} = useQuery({
        queryKey: ["getStorageMaterial"],
        queryFn: async () => {
            return storageAPI.getStorageMaterial({
                search: debounceValue,
                page: page,
                proficiency_level: goal,
                current_level: current,
                start_date: date?.from ? format(date?.from, "yyyy-MM-dd") : date?.from,
                end_date: date?.to ? format(date?.to, "yyyy-MM-dd") : date?.to,
            })
        },
    });

    useEffect(() => {
        refetch()
    }, [debounceValue, current, goal, date, page]);


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= last_page) {
            setPage(newPage);
        }
    };


    if (isLoading || isPending) {
        return <Loading/>;
    }


    const {current_page, last_page, data: roadmapData, next_page_url, prev_page_url} = data.data.data;


    return (<div className={'m-3'}>
            <h1 className="px-5 mt-5 font-medium text-xl">List Materials</h1>


            <div className={'flex gap-4 mx-4 mt-5'}>

                <Input type={'text'} onChange={(e)=>setSearch(e.target.value)} value={search} placeholder={`Search for Roadmap`}/>
                <Select onValueChange={(value) => setCurrent(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Current Level"/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                </Select>
                <Select onValueChange={(value) => setGoal(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Proficieny Level"/>
                    </SelectTrigger>

                    <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Expert">Expert</SelectItem>
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
                            roadmapData={roadmapData}
                            next_page_url={next_page_url}
                            prev_page_url={prev_page_url}
                            handlePageChange={handlePageChange}/>
        </div>
    );
}
