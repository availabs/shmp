import React from "react"

import ReadOnlyEditor from "components/dms/components/editor/editor.read-only"

import { getInputData } from "components/dms/wrappers/utils/get-dms-input"

const SectionView = ({ title, section, element, isRaw = true }) => {
  const { key, name, type, value } = element;

  const DisplayComp = React.useMemo(() => {
    return getInputData(type).getDisplayComp() || DefaultDisplayComp;
  }, [type, value]);

  return (
    <div>
      <div className="text-xl font-bold">
        { title }
      </div>
      <div className="border border-dashed rounded p-2">
        <DisplayComp value={ value } isRaw={ isRaw }/>
      </div>
    </div>
  )
}

export default SectionView;

const DefaultDisplayComp = ({ value }) => (
  <div className="whitespace-pre-wrap">
    { JSON.stringify(value, null, 3) }
  </div>
)
