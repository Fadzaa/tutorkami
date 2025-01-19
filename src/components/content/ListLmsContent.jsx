import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {Loading} from "@/components/loading/Loading.jsx";
import {cn} from "@/lib/utils.js";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import {lmsAPI} from "@/api/lms.js";
import {marked} from "marked";
import {InitialContent} from "@/components/content/InitialContent.jsx";
import {HeaderContent2} from "@/components/ui/header-content-2.jsx";
import {FooterContent2} from "@/components/ui/footer-content-2.jsx";
import {Editor} from "@tinymce/tinymce-react";

export function ListLmsContent({id,handle, regenerate, handleCompled, setDataPick}) {

    const [enable, setEnable] = useState(false);
    const [open, setOpen] = useState(false);
    const [length, setLength] = useState(null);
    const {isLoading, data, isFetching, refetch} = useQuery({
        queryKey: ["getLmsID",regenerate],
        queryFn: async () => {
            return lmsAPI.getLmsDetail(id, {regenerate : regenerate, length : length})
        },
        enabled: enable,
        refetchOnWindowFocus: false,
    });

    const modules = {
        toolbar:false,
    };

    const [value, setValue] = useState('');

    const handleRegenerate = () => {
        setValue('');
        handle(true);
    };

    const handleSolved = () => {
        if (data.result.solved !== true) {
            handle(false);
            lmsAPI.solvedLmsId(data.result.id);
            handleCompled(1, "",data.result.lms_topics_id, data.result.id)
            refetch();
        }
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
            setDataPick(true);
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
                                difficulty_level={data.subject.difficulty}
                                length={data.subject.length}
                                solved={data.result.solved}
                                main_content={data.result.sub_topic}
                            />

                            <Editor
                                apiKey='cnlivas6mxjs0iqh6d2y9xwvfsilnghkmrica2zvrafazrum'
                                plugins={[
                                    "autoresize"
                                ]}
                                init={{toolbar: false, menubar: false,
                                    resize: false,
                                    readonly: true,
                                    statusbar : false,
                                    selector: 'textarea',
                                    skin: 'borderless'}}
                                value={value}
                            />

                        </ContentDistance>
                    ) : <InitialContent type={"lms"}/>
                )}
            </div>


            {(isLoading || isFetching) || data?.result != null && (
                <FooterContent2 solved={handleSolved}/>
            )}


        </div>
    );
}

ListLmsContent.propTypes = {
    id: PropTypes.string,
    handle: PropTypes.func,
    regenerate: PropTypes.bool,
    handleCompled: PropTypes.func,
    setDataPick: PropTypes.func.isRequired,
}