import React from "react"
import {AvlMap} from 'components/avl-map/src'
import {layers} from './layers'
import {MAPBOX_TOKEN} from 'mapboxConfig'

const Edit = ({value, onChange}) => {
    let data = value;
    let mapOptions = {}
    return (
        <div className='h-96 flex-1 flex flex-col'>
            <AvlMap
                accessToken={ MAPBOX_TOKEN }
                mapOptions={ mapOptions }
                layers={ [layers.ACS_Census()] }
                sidebar={{
                    title: "Map",
                    tabs: ["layers", "styles"],
                    open: true
                }}
                onChange={(e) => {
                    onChange(JSON.stringify(e))
                }}
            />
        </div>
    )
}

Edit.settings = {
    hasControls: true,
    name: 'ElementEdit'
}

const View = ({value}) => {
    // if (!value) return false
    // let data = value['element-data']  // convertToRaw(value['element-data'])
    // if(data){
    //     data = EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
    // }
    return (
        <div className='relative w-full border border-dashed p-1'>
            {/*<ReadOnlyEditor value={data} isRaw={!!get(data, ['blocks'])}/>*/}
        </div>
    )
}


export default {
    "name": 'MapEditor',
    "edit": Edit,
    "view": View
}