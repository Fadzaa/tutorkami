import {ListQuestionCard} from "@/components/card/ListQuestionCard.jsx";
import {format} from "date-fns";
import {
    Pagination,
    PaginationContent, PaginationEllipsis,
    PaginationItem,
    PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination.jsx";
import PropTypes from "prop-types";


export function StorageContent({roadmapData,prev_page_url,next_page_url,last_page,current_page,handlePageChange,type}) {

    return (
        <>

            <div className="lg:grid gap-3 p-4 lg:grid-cols-4">
                {
                    type === "lms" ?
                        roadmapData.map((item) => (
                                <ListQuestionCard
                                    title={item.title}
                                    key={item.id}
                                    id={item.lms.id}
                                    date={format(new Date(item.date), "yyyy-MM-dd")}
                                    isQuestion={item.is_question}
                                    category={item.knowledge_level}
                                    proficiency={item.goal_level}
                                    type={item.type}
                                    isSolved={item.solved}
                                    storage={true}
                                />
                            ))
                        : roadmapData.map((item) => (
                                <ListQuestionCard
                                    title={item.title}
                                    key={item.id}
                                    id={item.id}
                                    date={format(new Date(item.date), "yyyy-MM-dd")}
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
            <Pagination className={"fixed left-0 bottom-0 mb-20  "}>
                <PaginationContent>
                    {/* Previous Page */}
                    {prev_page_url && (
                        <PaginationItem>
                            <PaginationPrevious href="#" onClick={() => handlePageChange(current_page - 1)}/>
                        </PaginationItem>
                    )}


                    {[...Array(last_page)].length > 1 ? [...Array(last_page)].map((_, index) => {
                        const pageNum = index + 1;

                        // Calculate the range to display (limit to 3 page numbers)
                        if (
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
                                    <PaginationEllipsis/>
                                </PaginationItem>
                            );
                        }

                        return null; // Skip rendering other pages
                    }) : ''}


                    {/* Next Page */}
                    {next_page_url && (
                        <PaginationItem>
                            <PaginationNext href="#" onClick={() => handlePageChange(current_page + 1)}/>
                        </PaginationItem>
                    )}
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