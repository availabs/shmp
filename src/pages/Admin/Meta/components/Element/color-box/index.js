import React from "react"

import { useDms } from "components/dms/contexts/dms-context"
import { useAuth } from "components/dms/contexts/auth-context"
// import { useTheme } from "components/avl-components/wrappers/with-theme"

import { useSetSections } from "components/dms/wrappers/dms-create"

import { createEmpty } from "components/dms/components/editor"

import { useDmsSections } from "components/dms/components/utils/dms-input-utils"
import { Button } from "@availabs/avl-components"
import { Select } from '@availabs/avl-components'


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
    //console.log('props', props)
    let data = JSON.parse(value) ? JSON.parse(value) : {}
    const ColorSelect = (v) => {
        console.log('onChange', v)
        let newValue = Object.assign({}, data, {'color': v})
        onChange(JSON.stringify(newValue))
    }
    return (
        <div className='w-full'>
            <div className='relative'>
                ColorBox Editor
                <Select
                    domain={['red', 'blue']}
                    value={data.color}
                    multi={false}
                    onChange={ColorSelect}
                />
                <div className='relative w-full border border-dashed p-1'>
                    <div style={{height: '150px', backgroundColor: data.color}}></div>
                </div>
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
    let data = JSON.parse(value['element-data'])
    console.log('color-box view', data)
    return (
        <div className='relative w-full border border-dashed p-1'>
            <div style={{height: '150px', backgroundColor: data.color}}></div>
        </div>
    )           
}


export default {
    "name": 'ColorBox',
    "edit": Edit,
    "view": View
}