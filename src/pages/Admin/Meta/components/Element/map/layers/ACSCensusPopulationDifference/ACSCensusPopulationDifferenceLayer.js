import React from "react"
import {LayerContainer} from "components/avl-map/src"
import {Link} from "react-router-dom"
import styled from "styled-components"
import get from "lodash.get"
import {extent} from "d3-array";
import {scaleQuantile, scaleQuantize} from "d3-scale"
import {fnum} from "utils/fnum"

import OptionsBox from "./infoBoxes/OptionsBox"
import OptionsModal from "./modals/OptionsModal"
import {getColorRange} from "@availabs/avl-components";

const HOVER_COLOR = "#f16913";

const LEGEND_COLOR_RANGE = ["#feedde", "#fdd0a2", "#fdae6b", "#fd8d3c", "#f16913", "#d94801", "#8c2d04"];

const keyRegex = /\w{6}(\w?)_(\d{3})\w/

const ALPHABET = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

const expandKeys = keys =>
    keys.reduce((a, c) => [...a, ...expandKeyRange(c)], [])
const expandKeyRange = key => {
    const split = key.split("...");
    if (split.length === 1) return split;
    const [start, end] = split,
        matchStart = keyRegex.exec(start),
        matchEnd = keyRegex.exec(end);

    if (matchStart[1] !== matchEnd[1] &&
        matchStart[2] === matchEnd[2]) {
        const s = matchStart[1],
            e = matchEnd[1],
            keys = [];
        let c = s;
        while (c <= e) {
            keys.push(start.replace(`${s}_`, `${c}_`));
            const index = ALPHABET.indexOf(c);
            c = ALPHABET[index + 1]
        }
        return keys;
    } else if (matchStart[2] !== matchEnd[2] &&
        matchStart[1] === matchEnd[1]) {
        const s = +matchStart[2],
            e = +matchEnd[2],
            keys = [];
        for (let i = s; i <= e; ++i) {
            keys.push(start.replace(`_${matchStart[2]}`, `_${(`000${i}`).slice(-3)}`));
        }
        return keys;
    }
    return [start];
}

const processConfig = config => {
    const newConfig = {
// supply defaults
        censusKeys: [],
        divisorKeys: [],
        asDensity: false,

        format: get(config, ["divisorKeys", "length"], 0) ? ",.1%" : fnum,

// override default values
        ...config,

// always use name as value
        value: config.name
    }

    newConfig.censusKeys = expandKeys(newConfig.censusKeys);
    newConfig.divisorKeys = expandKeys(newConfig.divisorKeys);

    return newConfig;
}

const COUNTIES = [
    '36001', '36083', '36093', '36091',
    '36039', '36021', '36115', '36113'
].sort((a, b) => +a - +b);

const YEARS = [2017, 2016, 2015, 2014];

class ACSCensusPopulationDifferenceLayeroptions extends LayerContainer {
    constructor(props) {
        super(props);
        this.falcorCache = {};
        this.viewid = props.viewId;
    }

    setActive = !!this.viewId
    name = 'ACS Census Population Difference Layer'
    selectedGeoids = []
    falcorCache = {}
    geoData = {}
    threeD = false

    filters = {
        area: {
            name: "Area",
            type: "dropdown",
            multi: true,
            value: [],
            domain: [],
            listAccessor: d => d.name,
            accessor: d => d.name,
            valueAccessor: d => d.value,
        },
        geolevel: {
            name: 'Geography Level',
            type: 'single',
            domain: [
                {name: "Counties", value: "counties"},
                {name: "Municipalities", value: "cousubs"},
                {name: "Tracts", value: "tracts"},
                {name: "Block Groups", value: "blockgroup"}
            ],
            value: ['counties'],
            listAccessor: d => d.name,
            accessor: d => d.name,
            valueAccessor: d => d.value,
            multi: false
        },
        year: {
            name: "Year",
            type: "dropdown",
            domain: YEARS,
            value: [YEARS[0]]
        },

        compareYear: {
            name: "Compare Year",
            type: "single",
            domain: YEARS,
            value: []
        },
        census: {
            name: "Census Labels",
            type: "dropdown",
            domain: CENSUS_FILTER_CONFIG,
            value: [CENSUS_FILTER_CONFIG[DEFAULT_CONFIG_INDEX].value],
            listAccessor: d => d.name,
            accessor: d => d.name,
            valueAccessor: d => d.value,
            multi: false,
            groups: CENSUS_FILTER_CONFIG.reduce((a, c) => {
                if (c.group !== currentGroup) {
                    currentGroup = c.group;
                    a.push({
                        name: currentGroup,
                        options: []
                    });
                }
                a[a.length - 1].options.push(c);
                return a;
            }, [])
        },
    }

    legend = {
        Title: ({layer}) => <>{layer.filters.census.value[0]}</>,
        type: "quantile",
        domain: [],
        format: CENSUS_FILTER_CONFIG[DEFAULT_CONFIG_INDEX].format,
        range: getColorRange(5, "YlOrRd", true),
        show: true,
    }

    onHover = {
        layers: ['counties', 'cousubs', 'tracts', 'blockgroup'],
        // dataFunc: function(features, point, lngLat, layerName) {
        // 	// DO SOME STUFF
        // }
    }

    onClick = {
        layers: ["counties", "cousubs", "tracts", "blockgroup"],
        dataFunc: function (features, point, lngLat, layer, e) {
            const geoid = get(features, [0, "properties", "geoid"]);
            this.selectGeoid(geoid);
            // this.history.push("/profile/" + geoid);
        }
    }

    // popover = {
    //     layers: ["counties", "cousubs", "tracts", "blockgroup"],
    //     setPinnedState: true,
    //     onPinned: function (features, lngLat, point) {
    //         const geoid = get(features, [0, "properties", "geoid"], null);
    //         geoid && this.map && this.map.setFilter(`${this.filters.geolevel.value}-line`, ["in", "geoid", geoid]);
    //     },
    //     onUnPinned: function () {
    //         this.map && this.map.setFilter(`${this.filters.geolevel.value}-line`, ["in", "geoid", "none"]);
    //     },
    //     callback:  (topFeature, features) => {
    //         let geoid = get(topFeature, ["properties", "geoid"], "");
    //
    //         const data = [];
    //
    //         let name = "";
    //         if (geoid.length < 11) {
    //             name = get(this.falcorCache, ["geo", geoid, "name"], geoid);
    //         } else if (geoid.length === 11) {
    //             const county = get(this.falcorCache, ["geo", geoid.slice(0, 5), "name"], "County");
    //             name = county + " Tract " + geoid.slice(5);
    //         } else if (geoid.length === 12) {
    //             const county = get(this.falcorCache, ["geo", geoid.slice(0, 5), "name"], "County");
    //             name = county + " Block Group " + geoid.slice(5);
    //         }
    //         if (name) data.push(name);
    //
    //         const value = get(this.geoData, [geoid], null);
    //         if (value !== null) {
    //             const format = (typeof this.legend.format === "function") ? this.legend.format : d3format(this.legend.format);
    //             data.push([this.filters.census.value[0], format(value)])
    //         }
    //         // data.push([<Link to={ `/profile/${ geoid }` }>View Profile</Link>]);
    //         data.push(["Click to view in profile."]);
    //
    //         return data;
    //     }
    // }

    baseMapSettings = {
        zoom: 7.8,
        center: [-73.8014, 42.91]
    }

    infoBoxes = [
        {
            type: 'selectedGeoids',
            title: null,
            closable: false,
            comp: SelectedGeoids,
            show: false
        },
        {
            type: 'controls',
            title: () => null,
            closable: false,
            comp: OptionsBox,
            show: true
        }
    ]

    modals = {
        options: {
            comp: OptionsModal,
            position: "top",
            startSize: [1000, 550]
        }
    }

    attributesTableOptions = {
        dataFunc: function ({layer, geoid}) {
            const censusName = this.filters.census.value[0],
                value = get(this, ["geoData", geoid], "no data");

            return {
                layer, geoid,
                "census name": censusName,
                value
            };
        }
    }

    sources = [
        // { id: "the-one-tile",
        //   source: {
        //     type: "vector",
        //     url: "mapbox://am3081.9rcqae8k"
        //   }
        // }
        {
            id: "counties",
            source: {
                'type': "vector",
                'url': 'mapbox://am3081.a8ndgl5n'
            },
        },
        {
            id: "cousubs",
            source: {
                'type': "vector",
                'url': 'mapbox://am3081.36lr7sic'
            },
        },
        {
            id: "tracts",
            source: {
                'type': "vector",
                'url': 'mapbox://am3081.2x2v9z60'
            },
        },
        {
            id: "blockgroup",
            source: {
                'type': "vector",
                'url': 'mapbox://am3081.52dbm7po'
            }
        }
    ]

    layers = [
        {
            'id': 'counties',
            'source': 'counties',
            'source-layer': 'counties',
            'type': 'fill',
            // filter: ['in', 'geoid', 'none'],
            paint: {
                'fill-color': '#ccc'
            }
        },
        {
            'id': 'cousubs',
            'source': 'cousubs',
            'source-layer': 'cousubs',
            'type': 'fill',
            filter: ['in', 'geoid', 'none']
        },
        {
            'id': 'tracts',
            'source': 'tracts',
            'source-layer': 'tracts',
            'type': 'fill',
            filter: ['in', 'geoid', 'none']
        },
        {
            id: "blockgroup",
            source: "blockgroup",
            'source-layer': "blockgroups",
            'type': 'fill',
            filter: ['in', 'geoid', 'none']
        },

        {
            id: 'cousubs-outline',
            source: 'cousubs',
            'source-layer': 'cousubs',
            type: 'line',
            filter: ['in', 'geoid', 'none'],
            paint: {
                "line-color": "#b00",
                "line-width": 1
            }
        },

        {
            'id': 'counties-line',
            'source': 'counties',
            'source-layer': 'counties',
            'type': 'line',
            paint: {
                "line-width": 2,
                "line-color": HOVER_COLOR,
                "line-opacity": [
                    "case",
                    ["boolean", ["feature-state", "pinned"], false],
                    1.0, 0.0
                ]
            }
        },
        {
            'id': 'cousubs-line',
            'source': 'cousubs',
            'source-layer': 'cousubs',
            'type': 'line',
            paint: {
                "line-width": 2,
                "line-color": HOVER_COLOR,
                "line-opacity": [
                    "case",
                    ["boolean", ["feature-state", "pinned"], false],
                    1.0, 0.0
                ]
            }
        },
        {
            'id': 'tracts-line',
            'source': 'tracts',
            'source-layer': 'tracts',
            'type': 'line',
            paint: {
                "line-width": 2,
                "line-color": HOVER_COLOR,
                "line-opacity": [
                    "case",
                    ["boolean", ["feature-state", "pinned"], false],
                    1.0, 0.0
                ]
            }
        },
        {
            'id': 'blockgroup-line',
            'source': 'blockgroup',
            'source-layer': 'blockgroups',
            'type': 'line',
            paint: {
                "line-width": 2,
                "line-color": HOVER_COLOR,
                "line-opacity": [
                    "case",
                    ["boolean", ["feature-state", "pinned"], false],
                    1.0, 0.0
                ]
            }
        },

        {
            id: 'cousubs-labels',
            source: 'cousubs',
            'source-layer': 'cousubs',
            type: 'symbol',
            filter: ['in', 'geoid', 'none'],
            layout: {
                "symbol-placement": "point",
                "text-size": 12
            },
            paint: {
                "text-color": "#000"
            }
        }
    ]

    init(map, falcor) {
        if (!map || !falcor) {
            console.log('no map or falcor', map, falcor)
            return Promise.resolve();
        }
        console.log('map??', map.setPaintProperty)
        this.falcorCache = falcor.getCache();

        return falcor.get(["geo", COUNTIES, ["cousubs", "name"]])
            .then(res => {
                const cousubs = COUNTIES.reduce((a, c) => {
                    a.push(...get(res, ["json", "geo", c, "cousubs"], []));
                    return a;
                }, [])

                return falcor.get(["geo", cousubs, "name"])
                    .then(() => {
                        const cache = falcor.getCache();
                        this.filters.area.domain = [
                            ...COUNTIES,
                            ...cousubs
                        ]
                            .sort((a, b) => {
                                if (a.length === b.length) {
                                    return +a - +b;
                                }
                                if (a.length < b.length) {
                                    return +a < +b.slice(0, 5);
                                }
                                if (a.length > b.length) {
                                    return +a.slice(0, 5) - +b;
                                }
                            })
                            .map(geoid => ({
                                value: geoid,
                                name: get(cache, ["geo", geoid, "name"], geoid)
                            }))
                    })
            })
            .then(() => this.fetchData(falcor))
            //.then(() => this.render(map, falcor))
            .then(() => {
                this.threeD && map.easeTo({pitch: 65, bearing: 45, duration: 3000});
            })
    }

    receiveProps(oldProps, newProps) {
        this.history = newProps.history;
    }

    getBaseGeoids() {
        let geoids = COUNTIES;

        const area = this.filters.area.value;

        if (area.length) {
            geoids = area;
        }
        return geoids;
    }

    getGeoids() {
        const geolevel = this.filters.geolevel.value;

        return this.getBaseGeoids().reduce((a, c) => {
            a.push(...get(this.falcorCache, ["geo", c, geolevel, "value"], []));
            return a;
        }, []);
    }

    selectGeoid(geoid) {
        if (!geoid) return;

        if (this.selectedGeoids.includes(geoid)) return;

        this.infoboxes.filter(i => i.type === 'selectedGeoids')[0].show = true;

        if (this.selectedGeoids.length === 2) {
            this.selectedGeoids = [this.selectedGeoids[1], geoid];
        } else {
            this.selectedGeoids.push(geoid);
        }
        this.forceUpdate();
    }

    removeSelectedGeoid(geoid) {
        this.selectedGeoids = this.selectedGeoids.filter(g => g !== geoid);
        this.infoboxes.filter(i => i.type === 'selectedGeoids')[0].show = Boolean(this.selectedGeoids.length);
        this.forceUpdate();
    }

    viewProfile() {
        const [g1, g2] = this.selectedGeoids,
            url = `/profile/${g1}${g2 ? `/compare/${g2}` : ""}`;

        this.infoboxes.filter(i => i.type === 'selectedGeoids')[0].show = false;
        this.selectedGeoids = [];

        this.history.push(url);
    }

    fetchData(falcor) {
        if (!falcor) {
            console.log('no  falcor')
            return Promise.resolve()
        }

        const geolevel = this.filters.geolevel.value,
            year = this.filters.year.value,
            filter = this.filters.census,
            value = filter.value[0],
            census = [
                ...filter.domain.reduce((a, c) => c.value === value ? c.censusKeys : a, []),
                ...filter.domain.reduce((a, c) => c.value === value ? c.divisorKeys : a, [])
            ];

        const geoids = this.getBaseGeoids();
        return falcor.get(
            ["geo", geoids, geolevel]
        )
            .then(() => {
                const cache = falcor.getCache(),
                    subGeoids = geoids.reduce((a, c) => {
                        a.push(...get(cache, ["geo", c, geolevel, "value"], []))
                        return a;
                    }, []);
                return falcor.get(
                    ["acs", subGeoids, year, census]
                )
            })
    }

    toggle3D() {
        this.threeD = !this.threeD;
        const mapPitch = this.map.getPitch(),
            mapBearing = this.map.getBearing();
        if ((mapPitch < (65 * 0.5)) && this.threeD) {
            const bearing = Math.abs(mapBearing) < 45 ? (Math.sign(mapBearing) || 1) * 45 : mapBearing;
            this.map.easeTo({pitch: 65, bearing, duration: 2000});
        } else if ((mapPitch !== 0) && !this.threeD) {
            this.map.easeTo({pitch: 0, bearing: 0, duration: 2000});
        }
        if (this.threeD) {
            this.map.setLayoutProperty('cousubs-labels', "visibility", "none")
            this.map.setLayoutProperty('cousubs-outline', "visibility", "none")
        } else {
            this.map.setLayoutProperty('cousubs-labels', "visibility", "visible")
            this.map.setLayoutProperty('cousubs-outline', "visibility", "visible")
        }
    }

    render(map, falcor) {
        if(!map || !falcor) return Promise.resolve();

        const cache = falcor.getCache(),
            geoids = this.getGeoids(),
            geolevel = this.filters.geolevel.value[0],
            year = this.filters.year.value[0],
            censusFilter = this.filters.census,
            censusValue = censusFilter.value[0],
            censusKeys = censusFilter.domain.reduce((a, c) => c.value === censusValue ? c.censusKeys : a, []),
            divisorKeys = censusFilter.domain.reduce((a, c) => c.value === censusValue ? c.divisorKeys : a, []);

        this.legend.format = censusFilter.domain.reduce((a, c) => c.value === censusValue ? c.format : a, ",d");

        const valueMap = geoids.reduce((a, c) => {
            let value = censusKeys.reduce((aa, cc) => {
                const v = get(cache, ["acs", c, year, cc], -666666666);
                if (v !== -666666666) {
                    aa += v;
                }
                return aa;
            }, 0);
            const divisor = divisorKeys.reduce((aa, cc) => {
                const v = get(cache, ["acs", c, year, cc], -666666666);
                if (v !== -666666666) {
                    aa += v;
                }
                return aa;
            }, 0)
            if (divisor !== 0) {
                value /= divisor;
            }
            a[c] = value;
            return a;
        }, {})
        const values = Object.values(valueMap);
        const colorScale = this.getColorScale(values),
            colors = {};
        for (const key in valueMap) {
            colors[key] = colorScale(valueMap[key]);
        }
        geoids.forEach(geoid => {
            colors[geoid] = get(colors, geoid, "#000")
        })

        console.log('map?', map.setPaintProperty)
        try{
            // map.setFilter(geolevel, ["in", "geoid", ...geoids]);
            map.setPaintProperty(geolevel, "fill-color", '#bb1616')
        }catch (e){
            console.log('apparently no map', map, map.setPaintProperty)
        }
    }

    getColorScale(domain) {
        switch (this.legend.type) {
            case "quantile":
                this.legend.domain = domain;
                return scaleQuantile()
                    .domain(this.legend.domain)
                    .range(this.legend.range);
            case "quantize":
                this.legend.domain = extent(domain)
                return scaleQuantize()
                    .domain(this.legend.domain)
                    .range(this.legend.range);
        }
    }
}

/*
  SOME POSSIBLE FORMATS
  ",d" ==> number with commas
  "$,d" ==> number with commas and leading $ sign
  ",.2%" ==> number converted to percent with commas
              2 digits after decimal point
              with following % sign
*/

const DEFAULT_CONFIG_INDEX = 0;
let currentGroup = null;

const CENSUS_FILTER_CONFIG = [

//---------------------------------------------- OVERVIEW ----------------------------------------------
    {
        name: "Total Population",
        censusKeys: ["B01003_001E"],
        group: "Overview"
    },

//---------------------------------------------- ECONOMY ----------------------------------------------
    {
        name: "Percent of Workers in the Hospitality Industries",
        censusKeys: [
            "C24030_051E",
            "C24030_024E"
        ],
        divisorKeys: ["C24030_001E"],
        group: "Economy"
    },

    {
        name: "Worked at Home as a Percent of Total Commuters",
        censusKeys: ["B08006_017E"],
        divisorKeys: ["B23025_001E"],
        group: "Economy"

    },

//---------------------------------------------- SOCIAL WELFARE ----------------------------------------------


    {
        name: "Median Earnings - Less than high school graduate",
        censusKeys: ['B20004_002E'],
        format: "$,d",
        group: "Social Welfare"
    },

    {
        name: "Percent Poverty Rate",
        censusKeys: ["B17001_002E"],
        divisorKeys: ["B17001_001E"],
        group: "Social Welfare"
    },

    {
        name: "GINI Index",
        censusKeys: ["B19058"],
        group: "Social Welfare"
    },

//---------------------------------------------- HEALTH ----------------------------------------------
    {
        name: "Percent Health Care Coverage",
        censusKeys: [
            "B27001_004E",
            "B27001_007E",
            "B27001_010E",
            "B27001_013E",
            "B27001_016E",
            "B27001_019E",
            "B27001_022E",
            "B27001_025E",
            "B27001_028E",
            "B27001_032E",
            "B27001_035E",
            "B27001_038E",
            "B27001_041E",
            "B27001_044E",
            "B27001_047E",
            "B27001_050E",
            "B27001_053E",
            "B27001_056E",
        ],
        divisorKeys: ["B27001_001E"],
        group: "Health"
    },

    {
        name: "Percent of Population Over 60",
        censusKeys: [
            "B01001_018E",
            "B01001_019E",
            "B01001_020E",
            "B01001_021E",
            "B01001_022E",
            "B01001_023E",
            "B01001_024E",
            "B01001_025E",
            "B01001_042E",
            "B01001_043E",
            "B01001_044E",
            "B01001_045E",
            "B01001_046E",
            "B01001_047E",
            "B01001_048E",
            "B01001_049E",
        ],
        divisorKeys: ["B01001_001E"],
        group: "Health"

    },

//---------------------------------------------- EDUCATION ----------------------------------------------
    {
        name: "Percent of Population with No High School Diploma or Equivalent",
        censusKeys: ['B15003_002E...B15003_016E'],
        divisorKeys: ['B01003_001E'],
        group: "Education"
    },

    {
        name: "Total Ages 5-19 Not Enrolled in School",
        censusKeys: ["B14003_023E...B14003_026E", "B14003_051E...B14003_054E"],
        group: "Education"
    },

    {
        name: "Percent Ages 3-4 Enrolled in School",
        censusKeys: ['B14003_004E', 'B14003_013E', 'B14003_032E', 'B14003_041E'],
        divisorKeys: ['B14003_004E', 'B14003_013E', 'B14003_022E', 'B14003_032E', 'B14003_041E', 'B14003_050E'],
        group: "Education"
    },

//---------------------------------------------- HOUSING ----------------------------------------------
    {
        name: "Percent Vacant Housing Units",
        censusKeys: ["B25002_003E"],
        divisorKeys: ['B25002_001E'],
        group: "Housing"
    },

    {
        name: "Percent Homeowners 65 and Older",
        censusKeys: ["B25007_009E", "B25007_010E", "B25007_011E"],
        divisorKeys: ['B25007_001E'],
        group: "Housing"
    },
//---------------------------------------------- TRANSPORTATION ----------------------------------------------
    {
        name: "Bike/Ped as a Percent of Total Commuters",
        censusKeys: ["B08006_014E", "B08006_015E"],
        divisorKeys: ["B23025_001E"],
        group: "Transportation"
    },

//------------------------------------- End of New Organization Progress --------------------------------------

].map(processConfig);

const Close = styled.span`
  text-align: right;
  cursor: pointer;
  color: currentColor;
  &:hover {
    color: #b00;
  }
`

const Geoid = ({geoid, remove, compare = false}) => {
    return !geoid ? null : (
        <div style={{width: "100%", display: "flex", marginBottom: "0.25rem"}}>
            <div style={{width: "46%", textAlign: "right", paddingRight: "0.5rem"}}>
                {compare ? "Compare " : ""}GEOID:
            </div>
            <div style={{width: "46%", paddingLeft: "0.5rem"}}>
                {geoid}
            </div>
            <div style={{width: "8%"}}>
                <Close className="fa fa-times"
                       onClick={e => remove(geoid)}/>
            </div>
        </div>
    )
}
const LinkButton = styled(Link)`
  text-decoration: none;

  &:hover {
    text-decoration: none;
  }
`

const SelectedGeoids = ({layer}) => {
    const [g1, g2] = layer.selectedGeoids;
    const remove = React.useMemo(() => {
        return layer.removeSelectedGeoid.bind(layer);
    }, [layer]);
    const href = React.useMemo(() => {
        return `/profile/${g1}${g2 ? `/compare/${g2}` : ""}`;
    }, [g1, g2]);
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "1rem"
        }}>
            <Geoid geoid={g1} remove={remove}/>
            <Geoid geoid={g2} remove={remove} compare/>
            <div>
                <LinkButton to={href}>
                    {g2 ? "Compare" : "View"} Profile{g2 ? "s" : ""}
                </LinkButton>
            </div>
        </div>
    )
}


export const ACSCensusPopulationDifferenceLayerFactory = (options = {}) => new ACSCensusPopulationDifferenceLayeroptions(options)