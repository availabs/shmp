import React from "react"
import get from 'lodash.get'
// import { useTheme } from "components/avl-components/wrappers/with-theme"
import Editor, { createEmpty, createWithContent, createEditorState } from "components/dms/components/editor"
import ReadOnlyEditor from "components/dms/components/editor/editor.read-only"
import htmlToDraft from 'html-to-draftjs';

import {
    convertToRaw,
    convertFromRaw,
    ContentState,
    EditorState
} from 'draft-js';
function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


const Edit = ({value, onChange}) => {
    let data = value ? isJson(value) ? JSON.parse(value) : value : createEmpty()
    console.log('in edit of draft', data, 'value', value)

    return (
        <div className='w-full'>
            <div className='relative'>
                Draft Editor
                <Editor 
                    value ={ !value ? createEmpty() : EditorState.createWithContent(data) }
                    //onChange={(e) => onChange(JSON.stringify(convertToRaw(e.getCurrentContent())))}
                    onChange={(e) => {
                        console.log('onChange', e, JSON.stringify(convertToRaw(e.getCurrentContent())))
                        //onChange(JSON.stringify(e.getCurrentContent()))
                        onChange(JSON.stringify(convertToRaw(e.getCurrentContent())))
                    }}
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
    return <div></div>
    if (!value) return false
    let data = convertToRaw(value['element-data'].getCurrentContent())  // convertToRaw(value['element-data'])
    console.log('in view of draft', data )
    return (
        <div className='relative w-full border border-dashed p-1'>
            <ReadOnlyEditor value={JSON.stringify(data)} isRaw={!!get(data, ['blocks'])} />
        </div>
    )
}


export default {
    "name": 'DraftEditor',
    "edit": Edit,
    "view": View
}