import React from "react"
// import { useTheme } from "components/avl-components/wrappers/with-theme"
import Editor, { createEmpty } from "components/dms/components/editor"
import ReadOnlyEditor from "components/dms/components/editor/editor.read-only"

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


const Edit = ({value, onChange}) => {
    let data = value && isJson(value) ? JSON.parse(value) : createEmpty()

    return (
        <div className='w-full'>
            <div className='relative'>
                Draft Editor
                <Editor 
                    value ={ data }
                />
            </div>
        </div>
    )
}

Edit.settings = {
    hasControls: true,
    name: 'ElementEdit'
}

const View = ({value}) => {
    if (!value) return false
    let data = value['element-data']
    return (
        <div className='relative w-full border border-dashed p-1'>
            <ReadOnlyEditor value={value.content} isRaw={value.content.blocks ? true : false} />
        </div>
    )
}


export default {
    "name": 'Draft Editor',
    "edit": Edit,
    "view": View
}