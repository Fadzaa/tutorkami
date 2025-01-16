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


export function StorageContent({roadmapData,prev_page_url,next_page_url,last_page,current_page,handlePageChange}) {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return (
        <>

            <div className="lg:grid gap-3 p-4 lg:grid-cols-4">
                {
                    roadmapData.map((item) => (
                                <ListSidebarCard
                                    title={item.title}
                                    key={item.id}
                                    id={item.id}
                                    date={formatInTimeZone(new Date(item.date), userTimeZone, "yyyy-MM-dd")}
                                    isQuestion={item.is_question}
                                    category={item.knowledge_level}
                                    proficiency={item.goal_level}
                                    type={item.type}
                                    isSolved={item.solved}
                                    storage={true}
                                />
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