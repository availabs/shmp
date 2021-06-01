import React  from "react"
// import {useTheme} from '@availabs/avl-components'
import AdminLayout from '../Layout'
import {MAPBOX_TOKEN} from "../../../mapboxConfig";
import {layers} from "../Meta/components/Element/map/layers";
import {AvlMap} from "../../../components/avl-map/src";


const Home = ({children}) => {
	let mapOptions = {}
	const onChange = (e) => {
		console.log('onChange', e)
	}
	return (
	  	<AdminLayout>
	  		<div className="w-full h-full">
				<AvlMap
					accessToken={ MAPBOX_TOKEN }
					mapOptions={ mapOptions }
					layers={ [layers.ACS_Census(), layers.ACS_Population_Difference()] }
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
		</AdminLayout>
	)
}

export default {
  path: "/map",
  exact: true,
  auth: true,
  component: Home,
  layout: 'Simple'
}