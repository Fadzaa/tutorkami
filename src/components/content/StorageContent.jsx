import {ListSidebarCard} from "@/components/card/ListSidebarCard.jsx";
import {format} from "date-fns";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";
import PropTypes from "prop-types";
import {formatInTimeZone} from "date-fns-tz";
import {useEffect, useState} from "react";


export function StorageContent({data,prev_page_url,next_page_url,last_page,current_page,handlePageChange}) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    console.log(data)

    const lmsTotalSolved = (item) => {
        let solved = 0;
        item?.subject_detail_lms?.lms?.topic?.forEach((item) => item.sub_topic.forEach((sub) => {
            if (sub.solved) {
                solved++;
            }
        }))
        return solved;
    }

    const lmsLength = (item) => {
        let length = 0;
        item?.subject_detail_lms?.lms?.topic?.forEach((item) =>
            length = length + item.sub_topic.length
        )
        return length;
    }

    return (
        <>
            <div className="lg:grid gap-3 p-4 lg:grid-cols-4">
                {
                    data.map((item) => (
                        item.type === 'LMS' ? (
                            <ListSidebarCard
                                key={item.id}
                                subject={item.subject}
                                topic={item.topic}
                                id={item.id}
                                date={format(item.date, "Y-M-dd")}
                                type={item.type}
                                subId={item.subject_detail_lms?.lms?.topic?.[0]?.sub_topic?.[0]?.id}
                                desc={`${item.subject_detail_lms.difficulty} • ${item.subject_detail_lms.activity_type}`}
                                isSolved={true}
                                totalSolve={lmsTotalSolved(item).toString()}
                                length={lmsLength(item).toString()}

                            />
                        ) : item.type === 'Question' ? (
                            <ListSidebarCard
                                key={item}
                                id={item.id}
                                title={item.subject}
                                type={item.type}
                                isSolved={item.subject_detail_question.is_solved}
                                date={format(item.date, "Y-M-dd")}
                                desc={`${item.subject_detail_question.question?.[0]?.type} • ${item.subject_detail_question.total} Questions • ${item.subject_detail_question.question_difficulty}`}
                                subject={item.subject}
                                topic={item.topic}
                            />
                        ) : item.type === 'Material' ? (
                            <ListSidebarCard
                                key={item}
                                title={item.subject}
                                topic={item.topic}
                                subject={item.subject}
                                id={item.id}
                                date={format(item.date, "Y-M-dd")}
                                type={item.type}
                                desc={`${item.subject_detail_material.output_format} • ${item.subject_detail_material.proficiency_level} • ${item.subject_detail_material.style_customization} • `}
                            />
                        ) : item.type === 'Roadmap' ? (
                            <ListSidebarCard
                                key={item}
                                id={item.id}
                                title={item.topic}
                                topic={item.topic}
                                type={item.type}
                                subject={item.subject}
                                isSolved={item.is_solved}
                                date={format(item.date, "Y-M-dd")}
                                desc={`${item.subject_detail_roadmap.user_proficiency_level} • ${item.subject_detail_roadmap.proficiency_level} • ${item.subject_detail_roadmap.timeline}`}
                                totalSolve={item.subject_detail_roadmap.roadmap.filter((item) => item.solved === 1).length}
                                length={item.subject_detail_roadmap.roadmap.length}
                            />
                        ) : <div>empty</div>
                            ))

                }
            </div>


            {/* Pagination */}
            <Pagination className={"fixed left-0 bottom-0 mb-20"}>
                <PaginationContent>
                    {/* Previous Page */}
                    <PaginationItem>
                        <PaginationPrevious
                            href="#"
                            onClick={() => handlePageChange(current_page - 1)}
                            disabled={!prev_page_url || current_page === 1}
                        />
                    </PaginationItem>

                    {/* Page Numbers */}
                    {[...Array(last_page)].map((_, index) => {
                        const pageNum = index + 1;

                        // Calculate the range to display (limit to 3 page numbers)
                        if (
                            last_page === 1 || // Show single page when only one exists
                            pageNum === current_page || // Always show the current page
                            pageNum === 1 || // Always show the first page
                            pageNum === last_page || // Always show the last page
                            (pageNum >= current_page - 1 && pageNum <= current_page + 1) // Show up to two neighbors
                        ) {
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationLink
                                        href="#"
                                        onClick={() => handlePageChange(pageNum)}
                                        isActive={pageNum === current_page}
                                    >
                                        {pageNum}
                                    </PaginationLink>
                                </PaginationItem>
                            );
                        }

                        // Show ellipsis for skipped pages
                        if (
                            (pageNum === current_page - 2 || pageNum === current_page + 2) &&
                            pageNum !== 1 &&
                            pageNum !== last_page
                        ) {
                            return (
                                <PaginationItem key={pageNum}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return null; // Skip rendering other pages
                    })}

                    {/* Next Page */}
                    <PaginationItem>
                        <PaginationNext
                            href="#"
                            onClick={() => handlePageChange(current_page + 1)}
                            disabled={!next_page_url || current_page === last_page}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </>
    )
}

StorageContent.propTypes = {
    roadmapData: PropTypes.array,
    prev_page_url: PropTypes.string,
    next_page_url: PropTypes.string,
    last_page: PropTypes.number,
    current_page: PropTypes.number,
    handlePageChange: PropTypes.func,
}