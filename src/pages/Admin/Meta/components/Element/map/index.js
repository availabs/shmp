import React from "react"
import _ from "lodash"
import {AvlMap} from "../../../../../../components/avl-map/src";
import {layers} from './layers'
import {MAPBOX_TOKEN} from 'mapboxConfig'
import {Button} from "@availabs/avl-components";

const parseJSON = (value) => {
    if(!value) return {}

    try{
        return JSON.parse(value)
    }catch (e){
        return value
    }
}

const Edit = ({value, onChange, ...props}) => {
    const Layers = React.useRef(
        [layers.ACS_Census(), layers.ACS_Population_Difference()]
    );
    console.log('props?', parseJSON(value))
    return (
        <div className='h-80vh flex-1 flex flex-col'>
            <AvlMap
                accessToken={ MAPBOX_TOKEN }
                layers={ Layers.current }
                sidebar={{
                    title: "Map",
                    tabs: ["layers", "styles"],
                    open: true
                }}
                MapActions={[(e) => {console.log('saving map', e)}]}
                layerProps={
                    Layers.current
                        .reduce((acc, layer) => {
                            acc[layer.id] = {
                                data: parseJSON(value)[layer.id],
                                change: (e) => {
                                    onChange(JSON.stringify({[layer.id]: e}))
                                }
                            }
                            return acc
                        }, {})
                }
            />
        </div>
    )
}

Edit.settings = {
    hasControls: true,
    name: 'ElementEdit'
}

const View = ({value}) => {
    value = parseJSON(value)
    const Layers = React.useRef(
        [layers.ACS_Census(), layers.ACS_Population_Difference()]
    );

    return (
        <div className='h-80vh flex-1 flex flex-col'>
           <img src={_.values(value).filter(layer => layer.img)[0].img} />
        </div>
    )
}


export default {
    "name": 'MapEditor',
    "edit": Edit,
    "view": View
}