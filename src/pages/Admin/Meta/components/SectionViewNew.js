import React from "react"

import {getInputData} from "components/dms/wrappers/utils/get-dms-input"

const SectionView = ({title, section, element, isRaw = true}) => {
    let key, type, value;
    if (element) {
        key = element.key;
        type = element.type;
        value = element.value;
    }

    const DisplayComp = React.useMemo(() => {
        return getInputData(type).getDisplayComp() || DefaultDisplayComp;
    }, [type, /*value*/]);

    return (
        <div className='pt-24 -mt-24' id={title}>
            <div className="text-2xl font-bold border-t border-b border-gray-200 pt-2 pb-2">
                {title} <span className='text-sm text-blue-500'>{section}</span>
            </div>
            <div className="rounded py-4">
                <DisplayComp key={key} value={value} isRaw={isRaw}/>
            </div>
        </div>
    )
}

export default SectionView;

const DefaultDisplayComp = ({value}) => (
    <div className="whitespace-pre-wrap">
        {typeof value !== "string" ? JSON.stringify(value, null, 3) : value}
    </div>
)
