import {ACSCensusLayerFactory} from "./ACSCensusLayer/ACSCensusLayer";
import {ACSCensusPopulationDifferenceLayerFactory} from "./ACSCensusPopulationDifference/ACSCensusPopulationDifferenceLayer";

export const layers = {
    "ACS_Census" : ACSCensusLayerFactory,
    "ACS_Population_Difference": ACSCensusPopulationDifferenceLayerFactory
}