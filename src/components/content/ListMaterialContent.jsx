import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Loading} from "@/components/loading/Loading.jsx";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import 'react-quill/dist/quill.snow.css'; // ES6

import {materialAPI} from "@/api/material.js";
import {Editor} from "@tinymce/tinymce-react";
import {Button} from "@/components/ui/button.jsx";
import {Save} from "@mui/icons-material";

export function ListMaterialContent({id}) {

    const [enable, setEnable] = useState(false);
    const [editorContent, setEditorContent] = useState("");
    const {data, isFetching, refetch} = useQuery({
        queryKey: ["getMaterialID"],
        queryFn: async () => await materialAPI.getMaterialID(id),
        enabled: enable,
        refetchOnWindowFocus: false,
    });


    const {mutate, isPending,} = useMutation({
        mutationKey: ["updateMaterial"],
        mutationFn: async (body) => await materialAPI.updateMaterial(body, id),
        onError: (error) => console.log("onError: " + error)
    })


    useEffect(() => {
        if (enable && id) {
            refetch();
        } else if (id) {
            setEnable(true);
        }
    }, [id]);


    useEffect(() => {
        setEditorContent(data?.data)
    }, [isFetching,data]);




    const handleEditorChange = (content) => {
        setEditorContent(content);


    };

    const handleChange = ()=>{
        mutate({
            content:editorContent
        })
    }
    return (
        <div className="flex flex-col h-full relative flex-1">
            <Button className={'w-fit absolute top-20 right-11 z-50'} onClick={()=>handleChange()}>

                {
                    isPending ?<Loading/>:<Save/>
                }

            </Button>
            <ContentDistance>



                {

                    isFetching && data?.data == null ? <Loading/> : (
                        <Editor
                            apiKey='cnlivas6mxjs0iqh6d2y9xwvfsilnghkmrica2zvrafazrum'
                            init={{
                                selector: 'textarea',
                                plugins: [

                                    'anchor', 'autolink', 'codesample', 'lists', 'searchreplace', 'visualblocks',
                                    'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown'
                                ],
                                toolbar: ' blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap customInsertButton',
                                menubar: '',
                                tinycomments_mode: 'embedded',
                                tinycomments_author: 'Author name',
                                content_style: `
                                
                                


::-webkit-scrollbar-track
{
  border-radius: 10px;
  background-color: #F3F3F3;
}

::-webkit-scrollbar
{
  width: 10px;
  border-radius: 10px;
  background-color: #F3F3F3;
}

::-webkit-scrollbar-thumb
{
  border-radius: 10px;
  background-color: #0F172A;
}

.tox .tox-toolbar__primary tox-toolbar__group {
  border: none;
  box-shadow: none;
}
                                
                                `,

                                height: '90vh',
                                resize: true,
                                skin: 'borderless',
                                ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),

                            }}

                            value={editorContent}
                            onEditorChange={handleEditorChange}
                        />
                    )

                }


            </ContentDistance>


        </div>
    );
}

ListMaterialContent.propTypes = {
    id: PropTypes.string,
}