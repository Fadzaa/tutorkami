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

export function ListLmsCapstoneContent({data}) {

    const [value, setValue] = useState('');

    useEffect(() => {
        if (data !== undefined) {
            const htmlContent = marked(data?.lms_capstone.content);
            setValue(htmlContent);
        }
    }, [data]);


    return (
        <div className="flex flex-col h-full relative flex-1 overflow-hidden">

            <div className={cn(
                "flex-1 pb-5 cs overflow-y-auto",
            )}>
                {  data?.lms_capstone != null ? (
                        <ContentDistance>
                            {/*<HeaderContent2*/}
                            {/*    title={data.data.title}*/}
                            {/*    type={data.data.type}*/}
                            {/*    date={data.data.date}*/}
                            {/*    difficulty_level={data.subject.difficulty}*/}
                            {/*    length={data.subject.length}*/}
                            {/*    solved={data.result.solved}*/}
                            {/*    main_content={data.result.sub_topic}*/}
                            {/*/>*/}

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
                    ) : (<InitialContent type={"lms"}/>
                )}
            </div>


        </div>
    );
}

ListLmsCapstoneContent.propTypes = {
    data: PropTypes.object
}