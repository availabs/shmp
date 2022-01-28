import React, {useState} from "react"
import {Link} from 'react-router-dom'

import {DndList, Input, /*useTheme*/} from '@availabs/avl-components'
import {DmsButton} from "components/dms/components/dms-button"

import Layout from 'pages/Admin/Layout'


import get from "lodash.get"


// import ReadOnlyEditor from "components/DMS/components/editor/editor.read-only"

const reducer = (state, action) => {
    switch (action.type) {
        case "open":
            return {
                ...Object.keys(state).reduce((a, c) => ({...a, [c]: "closed"}), {}),
                [action.id]: "opened"
            };
        case "close":
            return {...state, [action.id]: "closed"};
        default:
            return {...state, [action.id]: "closed"};
    }
}

export default ({dataItems = [], interact, ...props}) => {
    //console.log(props)
    // const theme = useTheme()
    const [newSectionTitle, setNewSectionTitle] = useState('');

    const droppedSection = React.useCallback((start, end) => {
        const sections = [...dataItems]
            .filter(({data}) => data.sectionLanding)
            .sort((a, b) => a.data.index - b.data.index);

        const [item] = sections.splice(start, 1);
        sections.splice(end, 0, item);

        sections.forEach((item, i) => {
            interact("api:edit", item.id, {...item.data, index: i}, {loading: false});
            item.data.index = i; // <-- this is temp. It just makes the list look nice until data is updated
        })
    }, [dataItems, interact])

    const droppedSubsection = React.useCallback((start, end, section) => {
        const subSection = [...dataItems]
            .filter(({data}) => !data.sectionLanding && (data.section === section))
            .sort((a, b) => a.data.index - b.data.index);

        const [item] = subSection.splice(start, 1);
        subSection.splice(end, 0, item);

        subSection.forEach((item, i) => {
            interact("api:edit", item.id, {...item.data, index: i}, {loading: false});
            item.data.index = i; // <-- this is temp. It just makes the list look nice until data is updated
        })
    }, [dataItems, interact]);

    const [state, dispatch] = React.useReducer(reducer, {});

    const nextIndex = dataItems
        .filter(d => d.data.sectionLanding)
        .reduce((a, c) => {
            return Math.max(a, +get(c, ["data", "index"], 0))
        }, -1) + 1;

    return (
        <Layout>
            <div className="w-full max-w-7xl mx-auto p-2">
                <div className='pt-2 pb-3'>
                    <h3 className='inline font-bold text-3xl'> Pages</h3>
                </div>
                <div className="flex mt-3">
                    <Input value={newSectionTitle} onChange={setNewSectionTitle}
                           className='w-full text-xl p-4 flex-1 rounded-sm shadow p-2'
                           placeholder="Enter section name..." autoFocus/>
                    <DmsButton large className="flex-0 text-xl ml-3 bg-blue-100"
                               buttonTheme='buttonPrimary'
                               action={{
                                   disabled: !Boolean(newSectionTitle),
                                   action: 'api:create',
                                   seedProps: () => (
                                       {
                                           section: newSectionTitle,
                                           sectionLanding: true,
                                           index: nextIndex,
                                           showSidebar: true
                                       }
                                   )
                               }}/>
                </div>
                <div className='pt-4'>
                    {!dataItems.length ? null :
                        <DndList onDrop={droppedSection} className='pb-1 shadow'>
                            {dataItems
                                .filter(d => d.data.sectionLanding)
                                .sort((a, b) => +a.data.index - +b.data.index)
                                .map((d, i) => {
                                    const subSections = dataItems
                                        .filter(({data}) => !data.sectionLanding && (data.section === d.data.section))
                                        .sort((a, b) => +a.data.index - +b.data.index);
                                    const max = get(subSections, [subSections.length - 1, "data", "index"], -1);
                                    return (
                                        <div key={i} className='border-b border-gray-200 py-4'>
                                            <div style={{display: "flex", alignItems: "center"}}>
                                                <div className={subSections.length ? `cursor-pointer`: ``} style={{flexGrow: 1, display: "flex", alignItems: "center"}}
                                                     onClick={
                                                         () => dispatch({
                                                             type: state[d.id] === "opened" ? "close" : "open",
                                                             id: d.id
                                                         })
                                                     }
                                                >
                                                    <div style={{fontWeight: "bold", fontSize: "1.5rem", width: "30px"}}>
                                                        {!subSections.length ? null : state[d.id] === "opened" ? "-" : "+"}
                                                    </div>
                                                    {d.data.section}
                                                </div>
                                                <div style={{flexGrow: 0}}>
                                                    <DmsButton key="create"
                                                               action={{
                                                                   action: 'create',
                                                                   seedProps: () => ({
                                                                       section: d.data.section,
                                                                       index: max + 1
                                                                   })
                                                               }}
                                                               buttonTheme='buttonPrimary'
                                                               label='Add Page'/>
                                                    <DmsButton key="edit" item={d.id}
                                                               action="edit" buttonTheme='buttonPrimary'
                                                               className="ml-3 flex-0"/>
                                                    <DmsButton key="api:delete" item={d.id}
                                                               className="ml-3"
                                                               action={{
                                                                   action: 'api:delete',
                                                                   showConfirm: true
                                                               }}
                                                               label='Delete'/>
                                                </div>
                                            </div>
                                            {state[d.id] !== "opened" ? null :
                                                <div style={{flexGrow: 1}}>
                                                    <DndList
                                                        onDrop={(start, end) => droppedSubsection(start, end, d.data.section)}>
                                                        {subSections.map(d =>
                                                            <div key={d.id} className="flex border-b border-gray-200 "
                                                                 style={{padding: "1rem", alignItems: "center"}}>
                                                                <div className="flex-1">
                                                                    <Link to={`/p/view/${d.id}`}>
                                                                        <h4 style={{margin: "0px"}}>{d.data.title}</h4>
                                                                    </Link>
                                                                </div>
                                                                <DmsButton item={d.id} action="edit"
                                                                           buttonTheme='buttonPrimary'
                                                                           className="ml-3 flex-0"/>
                                                                <DmsButton item={d.id} action="api:delete"
                                                                           className="ml-3 flex-0"/>
                                                            </div>
                                                        )
                                                        }
                                                    </DndList>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </DndList>
                    }
                </div>
            </div>
        </Layout>
    )
}
