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
import {lmsAPI} from "@/api/lms.js";
import {marked} from "marked";
import {InitialContent} from "@/components/content/InitialContent.jsx";
import {HeaderContent2} from "@/components/ui/header-content-2.jsx";
import {FooterContent2} from "@/components/ui/footer-content-2.jsx";

export function ListLmsContent({id,handle, regenerate, handleCompled}) {

    const [enable, setEnable] = useState(false);
    const {isLoading, data, isFetching, refetch} = useQuery({
        queryKey: ["getLmsID",regenerate],
        queryFn: async () => {
            return lmsAPI.getLmsDetail(id, {regenerate : regenerate})
        },
        enabled: enable,
        refetchOnWindowFocus: false,
    });

    const modules = {
        toolbar:false,
    };

    const [value, setValue] = useState('');

    const handleRegenerate = () => {
        handle(true);
        setValue('');
    };

    const handleSolved = () => {
        handle(false);
        lmsAPI.solvedLmsId(data.result.id);
        handleCompled(1)
        refetch();
    };

    useEffect(() => {
        if (enable && id) {
            refetch();
            setValue('')
        } else if (id) {
            setEnable(true);
        }
    }, [id]);

    useEffect(() => {
        if (data !== undefined) {
            const htmlContent = marked(data?.result.detail_content);
            setValue(htmlContent);
            if (regenerate) {
                handleCompled(1, "decrease")
                handle(false);
            }
        }
    }, [data]);


    return (
        <div className="flex flex-col h-full relative flex-1 overflow-hidden">

            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
                isLoading || isFetching ? "flex items-center" : ""
            )}>
                {isLoading || isFetching ? (
                    <Loading/>
                ) : (

                    data?.result != null ? (

                        <ContentDistance>

                            <HeaderContent2
                                title={data.data.title}
                                type={data.data.type}
                                date={data.data.date}
                                goal_level={data.data.goal_level}
                                knowledge_level={data.data.knowledge_level}
                                solved={data.result.solved}
                                main_content={data.result.sub_topic}
                            />

                            <ReactQuill
                                theme="snow"
                                value={value}
                                onChange={setValue}
                                modules={modules}
                                readOnly={true}
                                placeholder="Begin typing..."
                            />

                        </ContentDistance>
                    ) : <InitialContent/>
                )}
            </div>


            {(isLoading || isFetching) || data?.result != null && (
                <FooterContent2 handle={handleRegenerate} solved={handleSolved}/>
            )}


        </div>
    );
}

ListLmsContent.propTypes = {
    id: PropTypes.string,
    handle: PropTypes.func,
    regenerate: PropTypes.bool,
    handleCompled: PropTypes.func,
}