import React, {useState} from "react";
import AdminLayout from "../Layout";
import AssetsFilteredTable from "./components/AssetsFilteredTable";
import AssetsFilteredTableStateAssetsByCounty from "./components/AssetsFilteredTableStateAssetsByCounty";
import SearchComp from "./components/AssetsSearchComp";
import {RenderTabs} from './components/Tabs'

const cols = {
    'Number of Assets': {disableFilters: true, disableSortBy: false},
    'Value of Assets': {disableFilters: true, disableSortBy: false, format: '$ Amount'},
    '# in 100 yr': {disableFilters: true, disableSortBy: false},
    '$ in 100 yr': {disableFilters: true, disableSortBy: false, format: '$ Amount'},
    '# in 500 yr': {disableFilters: true, disableSortBy: false},
    '$ in 500 yr': {disableFilters: true, disableSortBy: false, format: '$ Amount'}
}

const tableComp = ({scenarioIds, title, groupBy, filterBy}) => (
    <>
        <div className='pt-5 pb-3'>
            <h3 className='inline text-xl'> {title} </h3>
        </div>
        <AssetsFilteredTable
            viewOnly={false}
            onChange={(e) => console.log('onChange', e)}

            geo={'County'}
            groupBy={groupBy}
            groupByFilter={[]}
            filterBy={filterBy}
            filterByValue={[]}
            scenarioId={scenarioIds}
            pageSize={20}

            cols={Object.assign({[groupBy]: {disableFilters: true, disableSortBy: false}}, cols)}

        />
    </>)

const renderAssets = ({scenarioIds}) => {
    return (
        <>
            {tableComp({scenarioIds, title: 'Buildings By Owner Type', groupBy: 'Owner Type', filterBy: 'Owner Type'})}
            {tableComp({scenarioIds, title: 'Buildings By Land Use', groupBy: 'Land Use Type', filterBy: 'Land Use Type'})}
            {tableComp({scenarioIds, title: 'Critical Infrastructure', groupBy: 'Critical', filterBy: 'Critical'})}
        </>
    )
}

const renderStateAssets = ({scenarioIds}) => {
    return (
        <>
            <div className='pt-5 pb-3'>
                <h3 className='inline text-xl'> Buildings By Agency </h3>
            </div>
            <AssetsFilteredTable
                viewOnly={false}
                onChange={(e) => console.log('onChange', e)}

                geo={'County'}
                groupBy={'Agency'}
                groupByFilter={[]}
                filterBy={'Agency'}
                filterByValue={[]}
                scenarioId={scenarioIds}
                pageSize={25}

                cols={Object.assign({'Agency': {disableFilters: true, disableSortBy: false}}, cols)}

            />

            <div className='pt-5 pb-3'>
                <h3 className='inline text-xl'> Buildings By Jurisdiction </h3>
            </div>
            <AssetsFilteredTableStateAssetsByCounty
                viewOnly={false}
                onChange={(e) => console.log('onChange', e)}

                statewide={true}
                geo={'County'}
                groupBy={'Agency'}
                groupByFilter={[]}
                filterBy={'Jurisdiction'}
                filterByValue={[]}
                scenarioId={scenarioIds}
                pageSize={63}

                cols={Object.assign({'Agency': {disableFilters: true, disableSortBy: false}}, cols)}

            />
        </>
    )
}

const renderSearch = () => {
    return (
        <>
            <SearchComp />
        </>
    )
}

const Tables = ({children}) => {
    const [activeTab, setActiveTab] = useState('stateAssets');

    const scenarioIds = ['3', '4', '9', '10', '38', '12', '14', '15', '16', '40', '18', '19', '41', '43', '22', '44',
        '23', '24', '25', '26', '46', '28', '29', '47', '30', '49', '31', '52', '20', '27', '17', '33', '34', '13', '32',
        '42', '36', '35', '53', '54', '55', '56'];

    const tabMapping = {
        'stateAssets': renderStateAssets({scenarioIds}),
        'assets': renderAssets({scenarioIds}),
        'search': renderSearch({scenarioIds})
    }

    return (
        <AdminLayout>
            <div className="w-full max-w-7xl mx-auto p-2 mb-5">
                <RenderTabs view={activeTab} setView={setActiveTab}/>
                {
                    Object.keys(tabMapping)
                        .map(k => (
                            <div className={k === activeTab ? `block w-full` : `hidden`}>
                                {tabMapping[k]}
                            </div>
                        ))
                }
            </div>
        </AdminLayout>
    );
};

export default {
    path: "/assets",
    exact: true,
    auth: true,
    component: Tables,
    layout: "Simple",
};
