import React from "react"

import get from "lodash.get"

import { getInputData } from "components/dms/wrappers/utils/get-dms-input"

const DisplayComp = props => {
  const { title, section, element } = get(props, "value", {}),
    { key, name, type, value } = element;

  const DisplayComp = React.useMemo(() => {
    return getInputData(type).getDisplayComp() || DefaultDisplayComp;
  }, [type, value]);

  return (
    <div>
      <div className="border border-dashed rounded p-2">
        <DisplayComp value={ value } isRaw={ false }/>
      </div>
    </div>
  )
}

export default DisplayComp;

const DefaultDisplayComp = ({ value }) => (
  <div className="whitespace-pre-wrap">
    { JSON.stringify(value, null, 3) }
  </div>
)
