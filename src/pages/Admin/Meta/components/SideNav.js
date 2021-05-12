import React, {useState} from "react"
import {Scrollspy} from "@availabs/avl-components";

const SectionSideNav = ({sections}) => {
    const [activeId, setActiveId] = useState();
    console.log(activeId)
    return (<div className='bg-gray-50 shadow-lg w-56 h-screen fixed sm:block'>
        <Scrollspy items={sections.map(s => s.title)} currentClassName="active"
                   onUpdate={e => !e || setActiveId(e.id)} offset={-100}>
            <ul className='py-6 px-6 pr-4 text-md fixed w-56 h-9/10 overflow-auto scrollbar-sm'>
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
    </div>)
}

export default SectionSideNav