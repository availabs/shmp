// import React from "react"
import {LayerContainer} from "components/avl-map/src"
import get from "lodash.get"
import _ from "lodash"
import {extent} from "d3-array";
import {scaleQuantile, scaleQuantize} from "d3-scale"
import {format} from 'd3-format'
import {getColorRange} from "@availabs/avl-components";
import {CENSUS_FILTER_CONFIG} from './config/censusFilterConfig'
import /*OptionsBox,*/ {drawLegend} from "./infoBoxes/OptionsBox"
// import OptionsModal from "./modals/OptionsModal"

const HOVER_COLOR = "#f16913";
const DEFAULT_CONFIG_INDEX = 0;
const YEARS = [2017, 2016, 2015, 2014];

class ACSCensusPopulationDifferenceLayeroptions extends LayerContainer {
    constructor(props) {
        super(props);
        this.data = get(props, ['data', 'ACS Census Population Difference Layer'], {});
        console.log('v?', this.data.style)
        this.props = props;
        this.bounds = this.data.bounds;
       /* if(props.change){
            this.change = e => props.change({['ACS Census Population Difference Layer']: e})
        }*/
    }
    // setActive = !!this.viewId
    version = 1
    name = 'ACS Census Population Difference Layer'
    id = 'ACS Census Population Difference Layer'
    geoData = {}
    COUNTIES = []
    filters = {
        area: {
            name: "Area",
            type: "dropdown",
            multi: true,
            value: get(this.data, 'area', ['NY State']),
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
            value: get(this.data, 'compareYear', []),
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
        Title: ({layer}) => {
            let mainText = get(layer.filters.census, 'value'),
                years = typeof get(layer.filters.compareYear, 'value') === 'number' ?
                       `${get(layer.filters.year, 'value')} vs ${get(layer.filters.compareYear, 'value')}` : ``
            return `${mainText} ${years}`
        },
        type: "quantile",
        domain: [],
        format: CENSUS_FILTER_CONFIG[DEFAULT_CONFIG_INDEX].format,
        range: getColorRange(5, "YlOrRd", true),
        show: true,
    }

    // infoBoxes =
    //     [{
    //     Title: () => 'Save',
    //     Component: e => OptionsBox(e, (img) => {
    //         console.log(e)
    //         e.layer.img = img;
    //         e.layer.change({filters: e.layer.filters, ...{img}})
    //     }),
    //     show: true
    // }]

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
                data.push([`% change`, `${((value-compareValue)/value)*100}%`])
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
        if(this.data.bounds){
            map.fitBounds([[this.data.bounds._sw.lng, this.data.bounds._sw.lat], [this.data.bounds._ne.lng, this.data.bounds._ne.lat]]);
        }else {
            // fly to and zoom to ny
            map.fitBounds([
                [
                    -79.8046875,
                    40.538851525354666
                ],
                [
                    -71.7626953125,
                    45.042478050891546
                ]])
        }

        Object.keys(this.data.filters || {})
            .forEach(filter => {
                if (this.filters[filter]) this.filters[filter].value = this.data.filters[filter].value
            })

        if(this.data.legend){
            this.legend.range = this.data.legend.range
        }

        if(this.data.style){
            return map.setStyle(this.data.style)
        }else{
            this.style = map.getStyle();
        }
    }

    receiveProps(props, map, falcor, MapActions) {
    }

    onRemove(mapboxMap) {
        // super.onRemove(mapboxMap);
        if(this.change){
            this.change({})
        }
    }

    getBaseGeoids() {
        let geoids = this.COUNTIES;

        const area = this.filters.area.value;

        if (area.length) {
            geoids = area[0] === 'NY State' ? geoids : area;
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
        if(filterName === 'area' && newValue && newValue[0]){
            if (newValue[0].length === 5 && this.filters.geolevel.value === 'counties') {
                this.filters.geolevel.value = 'cousubs'
            }else if (newValue[0].length === 10 && ['counties', 'cousubs'].includes(this.filters.geolevel.value)) {
                this.filters.geolevel.value = 'tracts'
            }
        }

        if(this.change) this.change({filters: this.filters, img: this.img, bounds: this.bounds, legend: this.legend, style: this.style})
    }

    async fetchData(falcor) {

        if (!falcor) {
            console.log('no  falcor')
            return Promise.resolve()
        }
        this.falcorCache = falcor.getCache();

        this.COUNTIES = await falcor.get(['geo', '36', 'counties']).then(({json:{geo:{'36':{counties}}}}) => counties);

        return falcor.get(["geo", this.COUNTIES, ["cousubs", "name"]])
            .then(res => {
                const cousubs = this.COUNTIES.reduce((a, c) => {
                    a.push(...get(res, ["json", "geo", c, "cousubs"], []));
                    return a;
                }, [])

                return falcor.get(["geo", cousubs, "name"])
                    .then(() => {
                        const cache = falcor.getCache();
                        this.filters.area.domain = [
                            'NY State',
                            ...this.COUNTIES,
                            ...cousubs
                        ]
                            .sort((a, b) => {
                                if (a.length === b.length) {
                                    return +a - +b;
                                }
                                if (a.length < b.length) {
                                    return +a < +b.slice(0, 5);
                                }
                                // if (a.length > b.length) {
                                    return +a.slice(0, 5) - +b;
                                //}
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
                        const cache = falcor.getCache();
                        return geoids.reduce((a, c) => {
                                return a.then(() => falcor.get(
                                    ["acs", get(cache, ["geo", c, geolevel, "value"], []), compareYear ? [year, compareYear] : [year], census]
                                ))
                            }, Promise.resolve());
                    })
            })
    }

    render(map, falcor) {

        if (!map || !falcor) return Promise.resolve();
        this.falcorCache = falcor.getCache();
        if(this.change) this.change({filters: this.filters, ...{img:this.img}, bounds: map.getBounds(), legend: this.legend, style: this.style});
        if(this.change){

            map.on('resize', (e) => {
                this.bounds = map.getBounds();
                this.change({filters: this.filters, img: this.img, bounds:  this.bounds, legend: this.legend, style: this.style});
            })

            map.on('render', (e) => {
                const canvas = document.querySelector("canvas.mapboxgl-canvas"),
                    newCanvas = document.createElement("canvas");

                let img;

                newCanvas.width = canvas.width;
                newCanvas.height = canvas.height;

                const context = newCanvas.getContext("2d")
                context.drawImage(canvas, 0, 0);

                drawLegend({legend: this.legend, filters: this.filters}, newCanvas, canvas);
                img = newCanvas.toDataURL();
                this.img = img;
                this.change({filters: this.filters, img, bounds: map.getBounds(), legend: this.legend, style: this.style})

            })

            map.on('styledata', (e) => {
                this.style = map.getStyle();
                this.change({filters: this.filters, img: this.img, bounds:  this.bounds, legend: this.legend, style: this.style});
            })
        }


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

        let compareValueMap = {};
        this.differanceValueMap = {}
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

                this.differanceValueMap[c] = ((value - compareValue)/value);
            }
            return a;
        }, {})
        this.valueMap = valueMap
        this.compareValueMap = compareValueMap

        const values = Object.values(typeof compareYear === 'number' ? this.differanceValueMap : valueMap);
        const colorScale = this.getColorScale(values),
            colors = {};

        _.keys(valueMap).forEach(key => {
            colors[key] = colorScale(typeof compareYear === 'number' ? this.differanceValueMap[key] : valueMap[key]);
            colors[key] = !colors[key] ? '#000000' : colors[key]
        })

        try {
            ['counties', 'cousubs', 'tracts', 'blockgroup']
            .forEach(l => {
                map.setFilter(l, ["in", "geoid", ...geoids]);
            })

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
                if(typeof this.filters.compareYear.value === 'number') {
                    this.legend.format = ",.1%"; // doesn't work in onFilterChange
                }
                return scaleQuantile()
                    .domain(this.legend.domain)
                    .range(this.legend.range);
            case "quantize":
                this.legend.domain = extent(domain)
                return scaleQuantize()
                    .domain(this.legend.domain)
                    .range(this.legend.range);
            default:
                this.legend.domain = extent(domain)
                return scaleQuantize()
                    .domain(this.legend.domain)
                    .range(this.legend.range);
        }
    }
}


export const ACSCensusPopulationDifferenceLayerFactory = (options = {}) => new ACSCensusPopulationDifferenceLayeroptions(options)