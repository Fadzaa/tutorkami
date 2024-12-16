import {cn} from "@/lib/utils.js";
import {Loading} from "@/components/loading/Loading.jsx";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet.jsx";
import {FooterContent} from "@/components/ui/footer-content.jsx";
import {HeaderContentSkeleton} from "@/components/skeleton/HeaderContentSkeleton.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

export function ContentRoadmapSkeleton() {
    return (
        <div className="flex flex-col h-full relative flex-1 overflow-hidden">

            <div className={"flex-1 pb-5 cs overflow-y-auto "}>
                <ContentDistance>

                    <HeaderContentSkeleton/>
                    {Array(5).fill(null).map((item, i) => (
                        <Skeleton
                            className="text-transparent flex justify-start w-full p-4 gap-4 rounded-lg  border-accent border-2 hover:bg-accent cursor-pointer">
                            <div className="h-auto w-[1px] "></div>
                            <div className="flex flex-col items-start gap-3">
                                <h1>{`title`}</h1>
                                <p className="text-start lg:text-center">desc</p>
                            </div>
                        </Skeleton>
                    ))}

                </ContentDistance>
            </div>
        </div>
    )
}