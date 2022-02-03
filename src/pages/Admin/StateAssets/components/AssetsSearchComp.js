import React, {useEffect, useState} from 'react'
import {AsyncTypeahead} from 'react-bootstrap-typeahead';
import {useFalcor} from '@availabs/avl-components'

function SearchComp(props) {
    const {falcor, falcorCache} = useFalcor();
    const [state, setState] = useState({isLoading: false, options: []});

    useEffect(() => {
        async function fetchData() {

        }

        return fetchData();
    }, []);

    return (
        <div className={'w-full h-full'}>
            <AsyncTypeahead
                // className={'w-full h-14'}
                isLoading={state.isLoading}
                onSearch={() => {}}
                minLength = {3}
                id="my-typeahead-id"
                placeholder="Search for an Address..."
                options={state.options.map(d => d.address)}
                labelKey="address"
                onChange = {() => {}}
                // style={{'height': '50px', 'min-width': '500px'}}
            />
        </div>
    )
}

export default SearchComp