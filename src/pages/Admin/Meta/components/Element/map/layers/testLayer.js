import React from "react"
import {LayerContainer} from "components/avl-map/src"
import {getColorRange} from "@availabs/avl-components";

const HOVER_COLOR = "#f16913";

const YEARS = [2017, 2016, 2015, 2014];

class ACSCensusPopulationDifferenceLayeroptions extends LayerContainer {
    constructor(props) {
        super(props);
        this.change = props.change;
    }

    name = 'Test'
    id = 'Test'

    filters = {
        year: {
            name: "Year",
            type: "dropdown",
            domain: YEARS,
            value: YEARS[0],
            multi: false
        }
    }

    legend = {
        Title: ({layer}) => <>{layer.filters.year.value}</>,
        type: "quantile",
        domain: [],
        range: getColorRange(5, "YlOrRd", true),
        show: true,
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
        if (!map || !falcor) {
            console.log('no map or falcor', map, falcor)
            return Promise.resolve();
        }
        console.log('init', this.change)
    }

    receiveProps(props, map, falcor, MapActions) {
        this.change = props.change;
    }

    fetchData(falcor) {
        if (!falcor) {
            console.log('no  falcor')
            return Promise.resolve()
        }

        this.falcorCache = falcor.getCache();

        console.log('FFD')

        return Promise.resolve();
    }

    render(map, falcor) {
        if (!map || !falcor) return Promise.resolve();

        this.falcorCache = falcor.getCache();
        console.log('in render', this.change)
        if (this.change) this.change('hi');

    }
}


export const TestLayerFactory = (options = {}) => new ACSCensusPopulationDifferenceLayeroptions(options)