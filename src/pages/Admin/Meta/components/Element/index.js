import React from "react"

import { useDms } from "components/dms/contexts/dms-context"
import { useAuth } from "components/dms/contexts/auth-context"
// import { useTheme } from "components/avl-components/wrappers/with-theme"

import { useSetSections } from "components/dms/wrappers/dms-create"

import { createEmpty } from "components/dms/components/editor"

import { useDmsSections } from "components/dms/components/utils/dms-input-utils"
import { Button } from "@availabs/avl-components"


import get from 'lodash.get'

const Edit = React.forwardRef(({ Attribute, id, autoFocus = false, onFocus, onBlur, onChange, value, save, buttonDisabled, ...props }, ref) => {
  value = value || {};
  console.log('trying element edit')
  const Props = { ...props, ...useDms(), user: useAuth().user };
  const sections = useSetSections(Attribute.Format),
    Sections = useDmsSections(sections, value, onChange, Props);

  let ElementType = get(Sections, '[0].attributes',[]).filter(a => a.key === 'element-type').pop()

  let ElementData = get(Sections, '[0].attributes',[]).filter(a => a.key === 'element-data').pop()
    

  return (
    <div className='w-full'>
        <div className='relative px-4 sm:px-6 lg:px-12'>
            Element Editor
            <div className='font-normal text-lg leading-8 text-gray-600'>
                {ElementType ? 
                <ElementType.Input
                    ref={ ref }
                    autoFocus={true}
                    value={ get(value, `[${ElementType.key}]`, '') }
                    placeholder={'Element Type'}
                    onChange={ElementType.onChange}
                /> : ''}
            </div>
            <div className='font-normal text-lg leading-8 text-gray-600'>
                {ElementData ? 
                <ElementData.Input
                    ref={ ref }
                    autoFocus={true}
                    value={ get(value, `[${ElementData.key}]`, '') }
                    placeholder={'Element Data'}
                    onChange={ElementData.onChange}
                /> : ''}
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
    if(!value) return false
    console.log('value', value)
    return (
        <div className='relative w-full border border-dashed p-1'>
            <div className='font-normal text-lg text-gray-600 leading-8'>
                Type: {value['element-type']}
            </div>
            <div className='font-normal text-lg text-gray-600 leading-8'>
                Data: {value['element-data']}
            </div>
        </div>
    )           
}





export default {
    "edit": Edit,
    "view": View
}