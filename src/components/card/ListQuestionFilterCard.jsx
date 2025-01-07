import PropTypes from "prop-types";
import {ListSkeleton} from "@/components/skeleton/ListSkeleton.jsx";
import {formatInTimeZone} from "date-fns-tz";
import { subDays, subMonths, subWeeks, subYears} from "date-fns";
import {ListQuestionCardWrapper} from "@/components/card/ListQuestionCardWrapper.jsx";

export function ListQuestionCardDetail({
                                     data, isLoading, type
                                 }) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const today = new Date();
    const yesterday = subDays(today, 1);
    const oneWeekAgo = subWeeks(today, 1);
    const oneMonthAgo = subMonths(today, 1);
    const oneYearAgo = subYears(today, 1);
    const oneYearAgoFormatted = formatInTimeZone(oneYearAgo, userTimeZone, "yyyy-MM-dd");
    const oneMonthAgoFormatted = formatInTimeZone(oneMonthAgo, userTimeZone, "yyyy-MM-dd");
    const oneWeekAgoFormatted = formatInTimeZone(oneWeekAgo, userTimeZone, "yyyy-MM-dd");
    const yesterdayFormatted = formatInTimeZone(yesterday, userTimeZone, "yyyy-MM-dd");
    const todayFormatted = formatInTimeZone(today, userTimeZone, "yyyy-MM-dd");

    return (
        <>
            <div className="cs px-5 h-[73%] my-5">
                    {
                        data?.data.filter(item => {
                            const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                            console.log(data.data.filter(item => {
                                const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                                return formattedDate >= oneWeekAgoFormatted && formattedDate < yesterdayFormatted;
                            }))
                            return formattedDate === todayFormatted;
                        }).length !== 0 ?
                            <>
                                <span>Hari Ini</span>
                                {
                                    isLoading ? <ListSkeleton/> : data.data.filter(item => {
                                        const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                                        return formattedDate === todayFormatted;
                                    }).map((item, index) => (
                                        <ListQuestionCardWrapper
                                            key={item.id}
                                            item={item}
                                            type={type}
                                            userTimeZone={userTimeZone}
                                        />
                                    ))
                                }
                                </>
                            : <></>
                    }

                {
                    data?.data.filter(item => {
                        const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                        return formattedDate === yesterdayFormatted;
                    }).length !== 0 ?
                        <>
                            <span>Kemaren</span>
                            {
                                isLoading ? <ListSkeleton/> : data.data.filter(item => {
                                    const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                                    return formattedDate === yesterdayFormatted;
                                }).map((item, index) => (
                                    <ListQuestionCardWrapper
                                        key={item.id}
                                        item={item}
                                        type={type}
                                        userTimeZone={userTimeZone}
                                    />
                                ))
                            }
                        </>
                        : <></>
                }

                {
                    data?.data.filter(item => {
                        const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                        return formattedDate >= oneWeekAgoFormatted && formattedDate < yesterdayFormatted;
                    }).length !== 0 ?
                        <>
                            <span>1 Minggu lalu</span>
                            {
                                isLoading ? <ListSkeleton/> : data.data.filter(item => {
                                    const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                                    return formattedDate >= oneWeekAgoFormatted && formattedDate < yesterdayFormatted;
                                }).map((item, index) => (
                                    <ListQuestionCardWrapper
                                        key={item.id}
                                        item={item}
                                        type={type}
                                        userTimeZone={userTimeZone}
                                    />
                                ))
                            }
                        </>
                        : <></>
                }

                {
                    data?.data.filter(item => {
                        const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                        return formattedDate >= oneMonthAgoFormatted && formattedDate <= oneWeekAgoFormatted;
                    }).length !== 0 ?
                        <>
                            <span>1 Bulan lalu</span>
                            {
                                isLoading ? <ListSkeleton/> : data.data.filter(item => {
                                    const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                                    return formattedDate >= oneMonthAgoFormatted && formattedDate <= oneWeekAgoFormatted;
                                }).map((item, index) => (
                                    <ListQuestionCardWrapper
                                        key={item.id}
                                        item={item}
                                        type={type}
                                        userTimeZone={userTimeZone}
                                    />
                                ))
                            }
                        </>
                        : <></>
                }

                {
                    data?.data.filter(item => {
                        const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                        return formattedDate >= oneYearAgoFormatted && formattedDate <= oneMonthAgoFormatted;
                    }).length !== 0 ?
                        <>
                            <span>1 Tahun lalu</span>
                            {
                                isLoading ? <ListSkeleton/> : data.data.filter(item => {
                                    const formattedDate = formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd");
                                    return formattedDate >= oneYearAgoFormatted && formattedDate <= oneMonthAgoFormatted;
                                }).map((item, index) => (
                                    <ListQuestionCardWrapper
                                        key={item.id}
                                        item={item}
                                        type={type}
                                        userTimeZone={userTimeZone}
                                    />
                                ))
                            }
                        </>
                        : <></>
                }
            </div>
        </>
    )
}

ListQuestionCardDetail.propTypes = {
    data: PropTypes.any,
    isLoading: PropTypes.bool,
    type: PropTypes.string,
}