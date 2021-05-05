import React from "react"
// import { useTheme } from "components/avl-components/wrappers/with-theme"
import AssetsTable  from './AssetsTable'

const Edit = ({value, onChange, ...rest}) => {
    return (
        <div className='w-full'>
            <div className='relative'>
                Assets Table Editor
                <AssetsTable
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
// console.log("VALUE:", value)
    if (!value) return false
    // let data = value['element-data']

    return (
        <div className='relative w-full p-1'>
            <AssetsTable
                viewOnly={true}
                value={ value }
            />
        </div>
    )
}


export default {
    "name": 'AssetsTable',
    "edit": Edit,
    "view": View
}
