import React from "react";
// import {useTheme} from '@availabs/avl-components'
import AdminLayout from "../Layout";
import { MAPBOX_TOKEN } from "mapboxConfig";
//import { layers } from "pages/Admin/Meta/components/Element/map/layers";
import { AvlMap } from "components/avl-map/src";
import { StateAssetsLayerFactory } from "./layers/StateAssetsLayer";
//import AvlMap from "components/AvlMap";

const Map = ({ children }) => {
	let mapOptions = {
		styles: [
			{
				name: "Light",
				style: "mapbox://styles/am3081/ckm86j4bw11tj18o5zf8y9pou",
			},
			{
				name: "Dark",
				style: "mapbox://styles/am3081/ckm85o7hq6d8817nr0y6ute5v",
			},
			{
				name: "Terrain",
				style: "mapbox://styles/am3081/cjhi0xntt5ul52snxcbsnaeii",
			},

			{
				name: "Satellite",
				style: "mapbox://styles/am3081/cjya6wla3011q1ct52qjcatxg",
			},
			{
				name: "Sattelite Streets",
				style: "mapbox://styles/am3081/cjya70364016g1cpmbetipc8u",
			},
		],
	};

	return (
		<AdminLayout>
			<div className="w-full h-full -mr-10 -mb-10 overflow-hidden">
				<AvlMap
					accessToken={MAPBOX_TOKEN}
					mapOptions={mapOptions}
					layers={[StateAssetsLayerFactory()]}
					sidebar={{
						title: "Map",
						tabs: ["styles", "layers"],
						open: false,
					}}
				/>
			</div>
		</AdminLayout>
	);
};

export default {
	path: "/scenariomap",
	exact: true,
	auth: true,
	component: Map,
	layout: "Simple",
};
