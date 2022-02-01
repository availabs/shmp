import React, {useState} from "react";
import AdminLayout from "../Layout";
import AssetsFilteredTable from "./components/AssetsFilteredTable";
import AssetsFilteredTableStateAssetsByCounty from "./components/AssetsFilteredTableStateAssetsByCounty";
import {RenderTabs} from './components/Tabs'

const renderAssets = ({scenarioIds}) => {
    return (
        <>
            <div className='pt-5 pb-3'>
                <h3 className='inline text-xl'> Buildings By Owner Type </h3>
            </div>
            <AssetsFilteredTable
                viewOnly={false}
                onChange={(e) => console.log('onChange', e)}

                geo={'County'}
                groupBy={'Owner Type'}
                groupByFilter={[]}
                filterBy={'Owner Type'}
                filterByValue={[]}
                scenarioId={scenarioIds}
                pageSize={20}

                cols={{
                    'Owner Type':{disableFilters: true, disableSortBy: false},
                    'Number of Assets':{disableFilters: true, disableSortBy: false}, 'Value of Assets':{disableFilters: true, disableSortBy: false},
                    '# in 100 yr':{disableFilters: true, disableSortBy: false}, '$ in 100 yr':{disableFilters: true, disableSortBy: false},
                    '# in 500 yr':{disableFilters: true, disableSortBy: false}, '$ in 500 yr':{disableFilters: true, disableSortBy: false}}}

            />

            <div className='pt-5 pb-3'>
                <h3 className='inline text-xl'> Buildings By Land Use </h3>
            </div>
            <AssetsFilteredTable
                viewOnly={false}
                onChange={(e) => console.log('onChange', e)}

                geo={'County'}
                groupBy={'Land Use Type'}
                groupByFilter={[]}
                filterBy={'Land Use Type'}
                filterByValue={[]}
                scenarioId={scenarioIds}

                cols={{
                    'Land Use Type':{disableFilters: true, disableSortBy: false},
                    'Number of Assets':{disableFilters: true, disableSortBy: false}, 'Value of Assets':{disableFilters: true, disableSortBy: false},
                    '# in 100 yr':{disableFilters: true, disableSortBy: false}, '$ in 100 yr':{disableFilters: true, disableSortBy: false},
                    '# in 500 yr':{disableFilters: true, disableSortBy: false}, '$ in 500 yr':{disableFilters: true, disableSortBy: false}}}

            />

            <div className='pt-5 pb-3'>
                <h3 className='inline text-xl'> Critical Infrastructure </h3>
            </div>
            <AssetsFilteredTable
                viewOnly={false}
                onChange={(e) => console.log('onChange', e)}

                geo={'County'}
                groupBy={'Critical'}
                groupByFilter={[]}
                filterBy={'Critical'}
                filterByValue={[]}
                scenarioId={scenarioIds}
                pageSize={20}

                cols={{
                    'Critical':{disableFilters: true, disableSortBy: false},
                    'Number of Assets':{disableFilters: true, disableSortBy: false}, 'Value of Assets':{disableFilters: true, disableSortBy: false},
                    '# in 100 yr':{disableFilters: true, disableSortBy: false}, '$ in 100 yr':{disableFilters: true, disableSortBy: false},
                    '# in 500 yr':{disableFilters: true, disableSortBy: false}, '$ in 500 yr':{disableFilters: true, disableSortBy: false}}}

            />
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

                cols={{
                    'Agency':{disableFilters: true, disableSortBy: false},
                    'Number of Assets':{disableFilters: true, disableSortBy: false}, 'Value of Assets':{disableFilters: true, disableSortBy: false},
                    '# in 100 yr':{disableFilters: true, disableSortBy: false}, '$ in 100 yr':{disableFilters: true, disableSortBy: false},
                    '# in 500 yr':{disableFilters: true, disableSortBy: false}, '$ in 500 yr':{disableFilters: true, disableSortBy: false}}}

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

                cols={{
                    'Agency':{disableFilters: true, disableSortBy: false},
                    'Number of Assets':{disableFilters: true, disableSortBy: false}, 'Value of Assets':{disableFilters: true, disableSortBy: false},
                    '# in 100 yr':{disableFilters: true, disableSortBy: false}, '$ in 100 yr':{disableFilters: true, disableSortBy: false},
                    '# in 500 yr':{disableFilters: true, disableSortBy: false}, '$ in 500 yr':{disableFilters: true, disableSortBy: false}}}

            />
        </>
    )
}

const renderSearch = () => {
    return (
        <>
            state assets
        </>
    )
}

const Tables = ({children}) => {
    const [activeTab, setActiveTab] = useState('assets');

    const tabMapping = {
        'stateAssets': renderStateAssets,
        'assets': renderAssets,
        'search': renderSearch
    }

    const scenarioIds = ['3','4','9','10','38','12','14','15','16','40','18','19','41','43','22','44',
        '23','24','25','26','46','28','29','47','30','49','31','52','20','27','17','33','34','13','32',
        '42','36','35','53','54','55','56'];

    return (
        <AdminLayout>
            <div className="w-full max-w-7xl mx-auto p-2 mb-5">
                <RenderTabs view={activeTab} setView={setActiveTab} />
                {tabMapping[activeTab]({scenarioIds})}
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
