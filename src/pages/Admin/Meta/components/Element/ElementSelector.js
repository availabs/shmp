import React from "react"

import {useDms} from "components/dms/contexts/dms-context"
import {useAuth} from "components/dms/contexts/auth-context"
// import { useTheme } from "components/avl-components/wrappers/with-theme"
import {useSetSections} from "components/dms/wrappers/dms-create"

import {useDmsSections} from "components/dms/components/utils/dms-input-utils"
import {Select} from "@availabs/avl-components"
import Elements from './index'

import get from 'lodash.get'

// function isJson(str) {
//     try {
//         JSON.parse(str);
//     } catch (e) {
//         return false;
//     }
//     return true;
// }
//
// const colorMapping = {
//     'RedBox' : {'backgroundColor': 'red'},
//     'BlueBox' : {'backgroundColor': 'blue'},
// }

const Edit = React.forwardRef(({
                                   Attribute,
                                   id,
                                   autoFocus = false,
                                   onFocus,
                                   onBlur,
                                   onChange,
                                   value,
                                   save,
                                   buttonDisabled,
                                   ...props
                               }, ref) => {
    value = value || {};
    console.log('trying element edit')
    const Props = {...props, ...useDms(), user: useAuth().user};
    const sections = useSetSections(Attribute.Format),
        Sections = useDmsSections(sections, value, onChange, Props);

    let ElementType = get(Sections, '[0].attributes', []).filter(a => a.key === 'element-type')[0]
    let ElementData = get(Sections, '[0].attributes',[]).filter(a => a.key === 'element-data')[0]

    let Element;
    if (ElementType) {
        Element = Elements[get(value, `[${ElementType.key}]`, '')]
    }

    return (
        <div className='w-full'>
            <div className='relative px-4 sm:px-6 lg:px-12'>
                Element Editor
                <div className='font-normal text-lg leading-8 text-gray-600'>
                    {ElementType ?
                        <ElementType.Input
                            ref={ref}
                            autoFocus={true}
                            value={get(value, `[${ElementType.key}]`, '')}
                            placeholder={'Element Type'}
                            onChange={ElementType.onChange}
                            EditComp={Select}
                            domain={Object.keys(Elements)}
                            multi={false}
                        /> : ''}
                </div>
                <div className='font-normal text-lg leading-8 text-gray-600'>
                    {ElementData ?
                        <ElementData.Input
                            ref={ref}
                            autoFocus={true}
                            disabled={true}
                            value={get(value, `[${ElementType.key}]`, '')}
                            placeholder={'Element Type'}
                            onChange={ElementType.onChange}
                        /> : ''}
                    {
                        Element ? <Element /> : ''
                    }
                </div>

            </div>
        </div>
    )
})


Edit.settings = {
    hasControls: true,
    name: 'ElementEdit'
}

const View = ({value}) => {
    if (!value) return false
    let Element = Elements[value['element-type']]

    return (
        <div className='relative w-full border border-dashed p-1'>
            <div className='font-normal text-lg text-gray-600 leading-8'>
                Type: {value['element-type']}
            </div>

            <Element />

        </div>
    )
}


export default {
    "edit": Edit,
    "view": View
}