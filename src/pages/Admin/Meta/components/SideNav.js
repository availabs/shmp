import React, {useState} from "react"
import {Scrollspy} from "@availabs/avl-components";

const SectionSideNav = ({sections}) => {
    const [activeId, setActiveId] = useState();
    const [open, setOpen] = useState(false);
    console.log(activeId)
    return (
        <React.Fragment>
            <div className={`block xl:hidden fas ${open ? `fa-times` : `fa-bars`} fixed p-4 z-10 flex-shrink-0 w-full bg-white`} onClick={() => setOpen(!open)}></div>
            <div class={`${open ? `block xl:hidden` : `hidden`} fixed inset-0 bg-gray-600 bg-opacity-75`}
            onClick={() => setOpen(!open)}></div>
            <div className={`${open ? `block` : `hidden`} xl:block mt-10 xl:mt-0 pt-5 xl:pt-0 bg-white xl:bg-gray-50 bg-opacity-100 shadow-lg w-56 min-w-1/2 xl:min-w-0 h-screen fixed z-10`}>
                <Scrollspy items={sections.map(s => s.title)} currentClassName="active"
                           onUpdate={e => !e || setActiveId(e.id)} offset={-100}>
                    <ul className='py-6 px-6 pr-4 text-md fixed w-56 h-9/10 overflow-hidden hover:overflow-auto scrollbar-xsm'>
                        {
                            sections.map((section, i) => {
                                return (
                                    <div key={i}>
                                        {(i === 0 || (sections[i - 1] && sections[i - 1].section !== section.section)) ?
                                            <li
                                                key={section.section + i}
                                                className={`${i === 0 ? '' : 'pt-6'} text-blue-500  pb-2 uppercase text-sm`}>
                                                {section.section}
                                            </li> : ''
                                        }
                                        <li
                                            key={i}
                                            className={`cursor-pointer hover:text-blue-500 ${activeId === section.title ? `text-blue-500` : ``}`}>
                                            <a href={`#${section.title}`}>{section.title}</a>
                                        </li>
                                    </div>
                                )
                            })
                        }
                    </ul>
                </Scrollspy>
            </div>
        </React.Fragment>
    )
}

export default SectionSideNav