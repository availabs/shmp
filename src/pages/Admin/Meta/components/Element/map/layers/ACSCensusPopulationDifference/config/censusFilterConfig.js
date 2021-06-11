import get from "lodash.get";
import {fnum} from "utils/fnum";

const keyRegex = /\w{6}(\w?)_(\d{3})\w/

const ALPHABET = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

const expandKeys = keys =>
    keys.reduce((a, c) => [...a, ...expandKeyRange(c)], []);

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
};

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

export const CENSUS_FILTER_CONFIG = [

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
    }

//------------------------------------- End of New Organization Progress --------------------------------------
].map(processConfig)