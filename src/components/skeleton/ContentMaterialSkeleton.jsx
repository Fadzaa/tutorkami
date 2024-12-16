import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {HeaderContentSkeleton} from "@/components/skeleton/HeaderContentSkeleton.jsx";
import {Skeleton} from "@/components/ui/skeleton.jsx";

export function ContentMaterialSkeleton() {
    return (
        <div className="flex flex-col h-full relative flex-1 -z-40">

            <div className={"flex-1 pb-5 cs overflow-y-auto"}>
                <ContentDistance>
                    <HeaderContentSkeleton/>
                    <Skeleton className="h-[70vh]"/>
                </ContentDistance>
            </div>

        </div>
    );
}