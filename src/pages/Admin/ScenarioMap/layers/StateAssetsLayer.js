import React from "react";
import { LayerContainer } from "components/avl-map/src";
import { Select, Table } from "@availabs/avl-components";
import get from "lodash.get";
import { fnum } from "utils/fnum";

const assetsUrl = "/data/state_assets_081221.json";

// const ATTRIBUTES = [
//   "building_id",
//   "address",
//   "prop_class",
//   "owner_type",
//   "replacement_value",
//   "agency",
//   "flood_zone",
// ];

// const floodZones = {
//   "100 Year": { values: ["AE", "A", "AH", "VE", "AO"], color: "#ff0031" },
//   "500 Year": { values: ["X"], color: "#005eff" },
//   none: { values: [null], color: "#242323" },
// };

export class StateAssetsLayer extends LayerContainer {
  name = "State Asset Layer";
  sources = [
    {
      id: "tracts",
      source: {
        type: "vector",
        url: "mapbox://am3081.92hcxki8",
      },
    },
    {
      id: "cousubs",
      source: {
        type: "vector",
        url: "mapbox://am3081.dlnvkxdi",
      },
    },
    {
      id: "counties",
      source: {
        type: "vector",
        url: "mapbox://am3081.1ggw4eku",
      },
    },
    {
      id: "agencies",
      source: {
        type: "geojson",
        data: assetsUrl,
      },
    },
  ];

  layers = [
    {
      id: "tracts-layer-line-agency",
      source: "counties",
      "source-layer": "counties",
      type: "fill",
      paint: {
        "fill-color": "rgba(0,0,0,0)",
        "fill-outline-color": "#000",
      },
    },
    {
      id: "agency-layer",
      source: "agencies",
      type: "circle",
      paint: {
        "circle-color": ["get", "color"],
        "circle-opacity": 0.7,
        "circle-radius": 3,
        "circle-stroke-width": 0,
        "circle-stroke-color": "#EFF6FF",
      },
    },
  ];
  constructor(props) {
    super(props);
    this.filterAgency = this.filterAgency.bind(this);
  }
  version = 1;
  state = {
    assets: [],
    agencies: [],
    selectedAgencies: [],
  };

  init(map, falcor) {
    let activeGeoid = 36;

    map.fitBounds([
      [-79.76259, 40.477399],
      [-71.777491, 45.015865],
    ]);

    return fetch(assetsUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("init", data);
        this.updateState({
          assets: data.features.map((d) => d.properties),
          agencies: data.features.reduce((agencies, asset) => {
            if (!agencies.includes(asset.properties.agency)) {
              agencies.push(asset.properties.agency);
            }
            return agencies;
          }, []),
        });
      });
  }

  filterAgency(values) {
    //console.log("filterAgency", a, b);
    this.updateState({ selectedAgencies: values });
  }

  infoBoxes = [
    {
      Component: ({ layer }) => {
        //console.log("infobox", layer.state);

        let byPlain = React.useMemo(
          () =>
            layer.state.assets
              .filter(
                (d) =>
                  layer.state.selectedAgencies.length === 0 ||
                  layer.state.selectedAgencies.includes(d.agency)
              )
              .reduce((byPlain, asset) => {
                if (!byPlain[asset.flood_zone]) {
                  byPlain[asset.flood_zone] = {
                    zone: asset.flood_zone,
                    color: asset.color,
                    buildings: 0,
                    value: 0,
                  };
                }
                byPlain[asset.flood_zone].buildings += 1;
                byPlain[asset.flood_zone].value += +asset.replacement_value;
                return byPlain;
              }, {}),
          [layer.state.assets, layer.state.selectedAgencies]
        );

        let byAgency = React.useMemo(
          () =>
            layer.state.assets.reduce((byAgency, asset) => {
              if (!byAgency[asset.agency]) {
                byAgency[asset.agency] = {
                  agency: asset.agency,
                };
              }
              let zone = asset.flood_zone.toLowerCase().split(" ").join("_");
              if (!byAgency[asset.agency][`num_${zone}`]) {
                byAgency[asset.agency][`num_${zone}`] = 0;
                byAgency[asset.agency][`value_${zone}`] = 0;
              }
              byAgency[asset.agency][`num_${zone}`] += 1;
              byAgency[asset.agency][`value_${zone}`] +=
                +asset.replacement_value;
              return byAgency;
            }, {}),
          [layer.state.assets, layer.state.selectedAgencies]
        );

        return (
          <div className="w-full h-full ">
            <div className="text-xl text-gray-600 font-medium">
              State Owned Assets
            </div>
            <div className="flex">
              {Object.values(byPlain).map((plain, i) => (
                <div
                  key={i}
                  className="flex-1 text-center border-r border-gray-200 last:border-0"
                >
                  <div className="text-gray-600 flex justify-center">
                    <div
                      className={`h-3 w-3 m-1 rounded-full border border-blue-200`}
                      style={{ backgroundColor: plain.color }}
                    />
                    <div className="flex">{plain.zone}</div>
                  </div>
                  <div className="text-xs text-gray-400">Buildings</div>
                  <div className="text-lg">
                    {plain.buildings.toLocaleString()}
                  </div>

                  <div className="text-lg">{fnum(plain.value)}</div>
                  <div className="text-xs text-gray-400">Value</div>
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500 pt-2"> Filter Agency</div>
            <Select
              onChange={layer.filterAgency}
              value={layer.state.selectedAgencies}
              options={layer.state.agencies.sort()}
              placeholder={"All Agencies"}
            />
            {/*<Table
              data={Object.values(byAgency)}
              columns={[{ id: "agency" }]}
            />*/}
            {/*<div className="flex flex-col">
              {Object.values(byAgency)
                .sort((a, b) => a.value_100_year - b.value_100_year)
                .map((d) => (
                  <div className="flex flex-row flex-1 items-baseline">
                    <div className="text-xs w-40">{d.agency}</div>
                    <div className="flex-1 text-xs text-right">
                      <div>{(d.num_100_year || 0).toLocaleString()}</div>
                      <div>{fnum(d.value_100_year)}</div>
                    </div>
                    <div className="flex-1 text-xs text-right">
                      <div>{(d.num_500_year || 0).toLocaleString()}</div>
                      <div>{fnum(d.value_500_year)}</div>
                    </div>
                    <div className="flex-1 text-xs text-right">
                      <div>{(d.num_none || 0).toLocaleString()}</div>
                      <div>{fnum(d.value_none)}</div>
                    </div>
                  </div>
                ))}
            </div>*/}
          </div>
        );
      },
      width: 400,
      show: true,
    },
  ];

  onHover = {
    layers: ["agency-layer"],

    callback: (layerId, features, lngLat) => {
      let feature = features[0];
      let data = [
        ...Object.keys(feature.properties).map((k) => [
          k,
          feature.properties[k],
        ]),
      ];

      return data;
    },
    //HoverComp
  };

  render(map) {
    if (this.state.selectedAgencies.length === 0) {
      map.setFilter("agency-layer", ["has", "agency"]);
    } else {
      map.setFilter("agency-layer", [
        "match",
        ["get", "agency"],
        this.state.selectedAgencies,
        true,
        false,
      ]);
    }
  }
}

export const StateAssetsLayerFactory = (options = {}) =>
  new StateAssetsLayer(options);
