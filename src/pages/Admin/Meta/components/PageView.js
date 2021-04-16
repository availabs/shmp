import React from "react"
import get from 'lodash.get'

import {TopNav} from '@availabs/avl-components'
import AuthMenu from 'pages/Auth/AuthMenu'
import SectionSideNav from './SideNav'

import SectionView from "./SectionViewNew"

import logo from './Logo.js'

const View = ({item, dataItems, ...props}) => {

    dataItems = dataItems.sort((a, b) => a.data.index - b.data.index)
    if (!item) {
        item = dataItems.filter(d => d.data.sectionLanding && d.data.index === 0).pop()
    }
    if (!item || !item.data) return null //<div> <h4>Data Configuration Error</h4> We cannot find the driods you are looking for. </div>

console.log('PageView item, dataItems', item,dataItems,props)

    const {data} = item
    let navItems = dataItems
        .filter(d => d.data.sectionLanding)
        .map((d) => {
            return {
                name: d.data.section,
                id: d.id,
                path: `/p/view/${d.id}`, // d.data['url-slug'],
                sectionClass: 'mb-4',
                itemClass: 'font-bold',
                children: dataItems
                    .filter(({data}) => !data.sectionLanding && (data.section === d.data.section))
                    .map(p => ({name: p.data.title, id:p.id, path: `/p/view/${p.id}`, itemClass: 'font-thin -mt-2'})),
                rest: props
            }
        })
    let activePage = props['doc-page'] || item
    let subNav = data.sectionLanding ? get(navItems.filter((data) => (data.id === get(activePage, `id`))), `[0].children`, []) :
        get(navItems.filter((data) => (data.children.map(c => c.id).includes(get(activePage, `id`)))), `[0].children`, [])

    return (
        <div className={`flex items-start flex-col min-h-screen`}>
            <div className='w-full fixed bg-white z-10'>
                <TopNav
                    menuItems={navItems}
                    open={false}
                    logo={logo('SHMP')}
                    rightMenu={<AuthMenu />}
                />
                {subNav.length ?
                	<TopNav
                		menuItems={subNav}
                		open={false}
                		customTheme={{
                			sidebarBg: 'bg-white',
                			topNavHeight: '12' ,
                			navitemTop: 'px-8 inline-flex items-center border-b border-r border-gray-200 text-base font-normal text-gray-800 hover:pb-4 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
                            navitemTopActive: 'px-8 inline-flex items-center border-b border-r border-gray-200 text-base font-normal text-blue-500 hover:pb-4 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
                		}} />
                	: null
               	}
            </div>
            <div className={`w-full hasValue flex-1 ${subNav.length ? 'mt-24' : 'mt-12'}`}>
                {   data.showSidebar ?
                    <SectionSideNav sections={ get(data, `sections`, []) } /> : ''
                }
                <div className={`h-full ${data.showSidebar ? 'sm:ml-56' : ''} p-1 md:p-6`}>

                    <div className={'bg-white'}>
                    	<div className='py-8 max-w-6xl mx-auto grid grid-cols-1 gap-y-2'>
                        { get(data, `sections`, [])
                            .map((section, i) =>
                              <SectionView key={ i } { ...section }/>
                            )
                        }
                      </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View
