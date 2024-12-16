import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {HeaderContent} from "@/components/ui/header-content.jsx";
import {FooterContent} from "@/components/ui/footer-content.jsx";
import {Loading} from "@/components/loading/Loading.jsx";
import {cn} from "@/lib/utils.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // ES6

import {materialAPI} from "@/api/material.js";
import {ContentMaterialSkeleton} from "@/components/skeleton/ContentMaterialSkeleton.jsx";

export function ListMaterialContent({id}) {

    const [enable, setEnable] = useState(false);

    const {isLoading, data, isFetching, refetch} = useQuery({
        queryKey: ["getRoadmapID"],
        queryFn: async () => {
            return materialAPI.getMaterialID(id)
        },

        enabled: enable,
        refetchOnWindowFocus: false,
    });

    const modules = {
        toolbar: [
            [{header: [1, 2, 3, false]}],
            ['bold', 'italic', 'underline', 'strike'],
            [{script: 'sub'}, {script: 'super'}],
            [{list: 'ordered'}, {list: 'bullet'}],
            [{align: []}],
            ['link', 'image'], //
            [{color: []}, {background: []}],
            ['clean'],
        ],
    };

    const [value, setValue] = useState('');

    useEffect(() => {
        if (enable && id) {
            refetch();
        } else if (id) {
            setEnable(true);
        }
    }, [id]);

    useEffect(() => {
        if (data !== undefined) {


            setValue(data?.data.material.content)
        }
    }, [data]);


    return (
        <div className="flex flex-col h-full relative flex-1 -z-40">

            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
                isLoading || isFetching ? "flex items-center" : ""
            )}>
                {isLoading || isFetching ? (
                    <ContentMaterialSkeleton/>
                ) : (
                    data?.data != null && (

                        <ContentDistance>

                            <HeaderContent
                                title={data?.data.title}
                                type={data?.data.type}
                                date={data?.data.date}
                                goal_level={data?.data.goal_level}
                                knowledge_level={data?.data.knowledge_level}

                            />

                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                modules={modules}
                                placeholder="Begin typing..."
                            />

                        </ContentDistance>
                    )
                )}
            </div>


            {(isLoading || isFetching) || data?.data != null && (
                <FooterContent url={"/tes"}/>
            )}


        </div>
    );
}

ListMaterialContent.propTypes = {
    id: PropTypes.string,
}