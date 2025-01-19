import PropTypes from "prop-types";
import {Suspense, useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {Loading} from "@/components/loading/Loading.jsx";
import {ContentDistance} from "@/components/ui/content-distance.jsx";
import 'react-quill/dist/quill.snow.css'; // ES6

import {materialAPI} from "@/api/material.js";
import {Editor} from "@tinymce/tinymce-react";
import {Button} from "@/components/ui/button.jsx";
import {Save} from "@mui/icons-material";
import {cn} from "@/lib/utils.js";
import {useNavigate} from "react-router-dom";
import {commonAPI} from "@/api/common.js";
import {regenerateAPI} from "@/api/regenerate.js";
import MaterialModal from "@/components/modals/MaterialModal.jsx";
import useMaterialModal from "@/hooks/use-material-modal.js";
import {useToast} from "@/hooks/use-toast.js";
import useMaterialGenerateQuizModal from "@/hooks/use-material-generate-quiz-modal.js";
import GenerateQuizModal from "@/components/modals/GenerateQuizModal.jsx";

export function ListMaterialContent({id}) {

    const [enable, setEnable] = useState(false);
    const [editorContent, setEditorContent] = useState("");
    const [save, setSave] = useState(false);
    const navigate = useNavigate()
    const queryClient = useQueryClient();
    const modal = useMaterialModal();
    const generateQuizModal = useMaterialGenerateQuizModal()
    const { toast } = useToast()
    const {data, isFetching, refetch} = useQuery({
        queryKey: ["getMaterialID"],
        queryFn: async () => await materialAPI.getMaterialID(id),
        enabled: enable,
        refetchOnWindowFocus: false,
    });


    const {mutate, isPending,} = useMutation({
        mutationKey: ["updateMaterial"],
        mutationFn: async (body) => await materialAPI.updateMaterial(body, id),
        onSuccess: ()=>{
            toast({
                title: "Update Material Success",
                description: "You have successfully update material.",
            })
        },
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Update Material Failed",
                description: "Failed update material",
            })
            console.log("onError: " + error)

        }
    })

    const {mutate: regenerate, isPending: regenerateLoading} = useMutation({
        mutationKey: ["regenerateMaterial"],
        mutationFn: async (body) => await regenerateAPI.regenerateMaterial(body, id),
        onSuccess: () => {
            toast({
                title: "Regenerate Material",
                description:  "Regenerate Material Successfully",
            })
            setSave(false)
            refetch()
            queryClient.invalidateQueries(['getMaterial']);

        },
        onMutate: () => setSave(false),
        onError: (error) => {
            toast({
                variant: "destructive",
                title: "Regenerate Failed",
                description: "Failed regenerated questions.",
            })
            console.log("onError: " + error)
        }
    })

    useEffect(() => {
        if (enable && id) {
            refetch();
        } else if (id) {
            setEnable(true);
        }
    }, [id]);


    useEffect(() => {
        setEditorContent(data?.data?.data)
    }, [isFetching, data]);

    useEffect(() => {
        setSave(editorContent !== data?.data?.data);
    }, [editorContent, data?.data?.data]);


    const handleEditorChange = (data, content) => {

        setEditorContent(content);


    };

    const handleChange = () => {
        mutate({
            content: editorContent
        })



    }
    return (
        <div className="flex flex-col h-full relative flex-1">


            {

                isFetching && data?.data?.data == null ? <Loading/> :
                    <>

                        {
                            save &&
                            <Button className={'w-fit absolute top-20 right-20 z-50'} onClick={() => handleChange()}>

                                {
                                    isPending ? <Loading/> : <Save/>
                                }

                            </Button>
                        }

                        <div className="flex-1 overflow-hidden">
                            <ContentDistance>


                                <Editor
                                    apiKey='cnlivas6mxjs0iqh6d2y9xwvfsilnghkmrica2zvrafazrum'
                                    init={{
                                        selector: 'textarea',
                                        plugins: [
                                            "autoresize",
                                            'anchor', 'autolink', 'codesample', 'lists', 'searchreplace', 'visualblocks',
                                            'checklist', 'mediaembed', 'casechange', 'export', 'formatpainter', 'pageembed', 'a11ychecker', 'permanentpen', 'powerpaste', 'advtable', 'advcode', 'editimage', 'advtemplate', 'ai', 'mentions', 'tinycomments', 'tableofcontents', 'footnotes', 'mergetags', 'autocorrect', 'typography', 'inlinecss', 'markdown'
                                        ],
                                        toolbar: ' blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap customInsertButton',
                                        menubar: '',
                                        statusbar: false,
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

                                        height: '79vh',
                                        resize: true,
                                        skin: 'borderless',
                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),

                                    }}

                                    value={editorContent}
                                    onEditorChange={(content) => handleEditorChange(data?.data?.data, content)}
                                />


                            </ContentDistance>
                        </div>
                        <div
                            className="h-[100px] overflow-hidden flex items-center justify-between gap-4 bg-white border-t-2 border-accent p-4">
                            <Button onClick={() => generateQuizModal.onOpen()}
                                    className="w-full">{"Generate a Quiz"}</Button>
                            <Button onClick={() => modal.onOpen()} className="w-full">{regenerateLoading ?
                                <Loading/> : "Regenerate"}</Button>
                        </div>
                        <Suspense>
                            <GenerateQuizModal subject={data?.data.subject_list.subject} topic={data?.data.subject_list.topic}/>
                            <MaterialModal regenerate={regenerate} regenerateLoading={regenerateLoading}/>
                        </Suspense>
                    </>


            }


        </div>
    );
}

ListMaterialContent.propTypes = {
    id: PropTypes.string,
}