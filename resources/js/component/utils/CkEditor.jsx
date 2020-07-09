import React from "react"
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


const CkEditor = ({value,onChange,disabled}) => {
    return(
            <CKEditor
                  editor={ClassicEditor}
                  disabled={disabled}
                  data={value}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    onChange(data)
                  }}
                  onInit={(editor) => {
                    editor.setData(value);
                  }}
                />
    )
}
export default CkEditor