import React from "react"
import {LayerContainer} from "components/avl-map/src"
import get from "lodash.get"
import _ from "lodash"
import {extent} from "d3-array";
import {scaleQuantile, scaleQuantize} from "d3-scale"
import {format} from 'd3-format'
import {getColorRange} from "@availabs/avl-components";
import {CENSUS_FILTER_CONFIG} from './config/censusFilterConfig'
import OptionsBox from "./infoBoxes/OptionsBox"
import OptionsModal from "./modals/OptionsModal"

const HOVER_COLOR = "#f16913";

const COUNTIES = [
    '36001', '36083', '36093', '36091',
    '36039', '36021', '36115', '36113'
].sort((a, b) => +a - +b);

const YEARS = [2017, 2016, 2015, 2014];

class ACSCensusPopulationDifferenceLayeroptions extends LayerContainer {
    constructor(props) {
        super(props);
        this.change = props.change;
    }
    // setActive = !!this.viewId
    name = 'ACS Census Population Difference Layer'
    id = 'ACS Census Population Difference Layer'
    selectedGeoids = []
    geoData = {}

    filters = {
        area: {
            name: "Area",
            type: "dropdown",
            multi: true,
            value: get(this.data, 'area', []),
            domain: [],
            listAccessor: d => d.name,
            accessor: d => d.name,
            valueAccessor: d => d.value,
        },
        geolevel: {
            name: 'Geography Level',
            id: 'Geography Level',
            type: 'dropdown',
            domain: [
                {name: "Counties", value: "counties"},
                {name: "Municipalities", value: "cousubs"},
                {name: "Tracts", value: "tracts"},
                {name: "Block Groups", value: "blockgroup"}
            ],
            value: get(this.data, 'geolevel', 'counties'),
            listAccessor: d => d.name,
            accessor: d => d.name,
            valueAccessor: d => d.value,
            multi: false
        },
        year: {
            name: "Year",
            type: "dropdown",
            domain: YEARS,
            value: get(this.data, 'year', YEARS[0]),
            multi: false
        },

        compareYear: {
            name: "Compare Year",
            type: "dropdown",
            domain: YEARS,
            value: get(this.data, 'compareYear', YEARS[1]),
            multi: false
        },
        census: {
            name: "Census Labels",
            type: "dropdown",
            domain: CENSUS_FILTER_CONFIG,
            value: get(this.data, 'census', CENSUS_FILTER_CONFIG[DEFAULT_CONFIG_INDEX].value),
            listAccessor: d => d.name,
            accessor: d => d.name,
            valueAccessor: d => d.value,
            multi: false,
        },
    }

    legend = {
        Title: ({layer}) => <>{get(layer.filters.census, 'value')}</>,
        type: "quantile",
        domain: [],
        format: CENSUS_FILTER_CONFIG[DEFAULT_CONFIG_INDEX].format,
        range: getColorRange(5, "YlOrRd", true),
        show: true,
    }

    infoBoxes =
        [{
        Title: () => 'Save',
        Component: e => OptionsBox(e, (img) => {
            console.log(e)
            e.layer.img = img;
            e.layer.change({filters: e.layer.filters, ...{img}})
        }),
        show: true
    }]

    onHover = {
        layers: ["counties", "cousubs", "tracts", "blockgroup"],
        callback: (layerId, features, lngLat) => {
            let geoid = get(features[0], ["properties", "geoid"], "");
            const data = [];
            let name = "";

            if (geoid.length < 11) {
                name = get(this.falcorCache, ["geo", geoid, "name"], geoid);
            } else if (geoid.length === 11) {
                const county = get(this.falcorCache, ["geo", geoid.slice(0, 5), "name"], "County");
                name = county + " Tract " + geoid.slice(5);
            } else if (geoid.length === 12) {
                const county = get(this.falcorCache, ["geo", geoid.slice(0, 5), "name"], "County");
                name = county + " Block Group " + geoid.slice(5);
            }
            if (name) data.push([name]);

            const value = get(this.valueMap, [geoid], null);
            const compareValue = get(this.compareValueMap, [geoid], null);
            if (value !== null) {
                const formatVal = (typeof this.legend.format === "function") ? this.legend.format : format(this.legend.format);
                data.push([`${this.filters.census.value} ${this.filters.year.value}`, formatVal(value)])
            }
            if (compareValue !== null) {
                const formatVal = (typeof this.legend.format === "function") ? this.legend.format : format(this.legend.format);
                data.push([`${this.filters.census.value} ${this.filters.compareYear.value}`, formatVal(compareValue)])
                data.push([`% change`, `${((value-compareValue)/compareValue)*100}%`])
            }
            return data;
        }
    }

    sources = [
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
            filter: ['in', 'geoid', 'none'],
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
        return Promise.resolve();
    }

    receiveProps(props, map, falcor, MapActions) {
        // MapActions.saveMapAsImage();
        this.change = props.change;
        if(props.data && props.data.filters){
            this.data = props.data.filters;
            Object.keys(props.data.filters)
                .forEach(filter => {
                    if(!_.isEqual(this.filters[filter].value, props.data.filters[filter].value)){
                        console.log('changing for ', filter, props.data.filters[filter].value)
                        this.filters[filter].value = props.data.filters[filter].value
                    }
                })
        }
    }

    // onRemove(mapboxMap) {
    //     super.onRemove(mapboxMap);
    //     this.change(this.filters)
    //     console.log('removing')
    // }

    getBaseGeoids() {
        let geoids = COUNTIES;

        const area = this.filters.area.value;

        if (area.length) {
            geoids = area;
        }
        return geoids;
    }

    getGeoids(falcor) {
        const geolevel = this.filters.geolevel.value;
        return this.getBaseGeoids().reduce((a, c) => {
            a.push(...get(falcor.getCache(), ["geo", c, geolevel, "value"], []));
            return a;
        }, []);
    }

    onFilterChange(filterName, newValue, prevValue) {
        super.onFilterChange(filterName, newValue, prevValue);
        if(this.change) this.change({filters: this.filters, img: this.img})
    }

    fetchData(falcor) {

        if (!falcor) {
            console.log('no  falcor')
            return Promise.resolve()
        }
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
            .then(() => {
                let geolevel = this.filters.geolevel.value,
                    year = get(this.filters.year, ['value'], YEARS[0]),
                    compareYear = get(this.filters.compareYear, ['value'], ),
                    filter = this.filters.census,
                    value = filter.value,
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
                            ["acs", subGeoids, compareYear ? [year, compareYear] : [year], census]
                        )
                    })
            })
    }

    render(map, falcor) {

        if (!map || !falcor) return Promise.resolve();
        this.falcorCache = falcor.getCache();
        if(this.change) this.change({filters: this.filters, ...{img:this.img}})
        let cache = falcor.getCache(),
            geoids = this.getGeoids(falcor),
            geolevel = this.filters.geolevel.value,
            year = get(this.filters.year, ['value'], [YEARS[0]]),
            compareYear = get(this.filters.compareYear, ['value'], []),
            censusFilter = this.filters.census,
            censusValue = censusFilter.value,
            censusKeys = censusFilter.domain.reduce((a, c) => c.value === censusValue ? c.censusKeys : a, []),
            divisorKeys = censusFilter.domain.reduce((a, c) => c.value === censusValue ? c.divisorKeys : a, []);
        this.legend.format = censusFilter.domain.reduce((a, c) => c.value === censusValue ? c.format : a, ",d");

        let compareValueMap = {}
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

            if(compareYear){
                let compareValue = censusKeys.reduce((aa, cc) => {
                    const v = get(cache, ["acs", c, compareYear, cc], -666666666);
                    if (v !== -666666666) {
                        aa += v;
                    }
                    return aa;
                }, 0);

                const compareDivisor = divisorKeys.reduce((aa, cc) => {
                    const v = get(cache, ["acs", c, compareYear, cc], -666666666);
                    if (v !== -666666666) {
                        aa += v;
                    }
                    return aa;
                }, 0)
                if (compareDivisor !== 0) {
                    compareValue /= compareDivisor;
                }
                compareValueMap[c] = compareValue;
            }
            return a;
        }, {})
        this.valueMap = valueMap
        this.compareValueMap = compareValueMap

        const values = Object.values(valueMap);
        const colorScale = this.getColorScale(values),
            colors = {};

        _.keys(valueMap).forEach(key => {
            colors[key] = colorScale(valueMap[key]);
        })

        try {
            ['counties', 'cousubs', 'tracts', 'blockgroup']
                .filter(l => l !== geolevel)
                .forEach(l => {
                    map.setFilter(l, ["in", "geoid", ...geoids]);
                })

            map.setFilter(geolevel, ["in", "geoid", ...geoids]);
            map.setPaintProperty(geolevel, "fill-color",
                ["get", ["get", "geoid"], ["literal", colors]]);
        } catch (e) {
            console.log('apparently no map', map)
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

const DEFAULT_CONFIG_INDEX = 1;

export const ACSCensusPopulationDifferenceLayerFactory = (options = {}) => new ACSCensusPopulationDifferenceLayeroptions(options)