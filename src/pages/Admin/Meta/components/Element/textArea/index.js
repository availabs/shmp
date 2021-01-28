import React from "react"

import { useDms } from "components/dms/contexts/dms-context"
import { useAuth } from "components/dms/contexts/auth-context"
// import { useTheme } from "components/avl-components/wrappers/with-theme"

import { useSetSections } from "components/dms/wrappers/dms-create"

import { createEmpty } from "components/dms/components/editor"

import { useDmsSections } from "components/dms/components/utils/dms-input-utils"
import { Button } from "@availabs/avl-components"
import { Select, TextArea } from '@availabs/avl-components'


import get from 'lodash.get'

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const Edit = ({value, onChange}) => {
    const updateValue = (v) => {
        value = v
    }
    return (
        <div className='w-full'>
            <div className='relative'>
                TextArea Editor
                <TextArea
                    value={value}
                    onChange={onChange}
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
    if(!value) return false
    let data = value['element-data']
    return (
        <pre className='relative w-full border border-dashed p-1'>
            {data}
        </pre>
    )           
}


export default {
    "name": 'TextArea',
    "edit": Edit,
    "view": View
}