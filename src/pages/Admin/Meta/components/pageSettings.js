import React, {useState} from 'react'
import {DmsButton} from "components/dms/components/dms-button";
import {Button} from "@availabs/avl-components";

const items = ({Title, URL, ShowSidebar, theme, createState, item, props, ...rest}) => {
    return (
        <React.Fragment>
            <div>
                <Button className="p-2 w-full"
                        onClick={() => {window.location = '/meta'}}
                        buttonTheme={"buttonPrimary"}>
                    Go to CMS
                </Button>
            </div>
            <div>
                <label className='pr-5'>Title</label>
                <Title.Input
                    className={'xl:bg-blue-50'}
                    autoFocus={true}
                    value={Title.value}
                    placeholder={'Title'}
                    onChange={Title.onChange}
                />
            </div>
            <div>
                <label className='pr-5'>URL</label>
                <URL.Input
                    className={`xl:ml-2 ${theme.text} xl:bg-blue-50`}
                    autoFocus={true}
                    value={URL.value}
                    placeholder={'/url'}
                    onChange={URL.onChange}
                />
            </div>
            <div>
                <label className='pr-5'>Sidebar</label>
                <ShowSidebar.Input
                    className={`xl:ml-2 ${theme.text} w-0.5 inline-block`}
                    autoFocus={true}
                    value={ShowSidebar.value}
                    onChange={ShowSidebar.onChange}
                />
            </div>
            <div className="xl:mt-2 xl:mb-4 xl:max-w-2xl">
                <DmsButton
                    className="xl:w-full xl:bg-blue-100"
                    buttonTheme='buttonPrimary'
                    large
                    type="submit"
                    label='Save'
                    action={{...createState.dmsAction, goBackAfterApiAction: false}}
                    item={item}
                    props={props}
                />
            </div>
        </React.Fragment>
    )
}
export const SmallView = ({Title, URL, ShowSidebar, theme, createState, item, props, ...rest}) => {
    const [psOpen, psSetOpen] = useState(false);

    return (
        <div>
            <div className={`fas ${psOpen ? `fa-times` : `fa-save`} p-4 pl-20 mr-4 cursor-pointer`} onClick={() => psSetOpen(!psOpen)}>
            </div>
            <div className={`${psOpen ? `block` : `hidden`} h-full max-w-4xl mx-auto p-4 mt-10 flex flex-col shadow-lg`}>
                {items({Title, URL, ShowSidebar, theme, createState, item, props, ...rest})}
            </div>
        </div>
    )
}

export const LargeView = ({Title, URL, ShowSidebar, theme, createState, item, props, ...rest}) => {

    return (
        <div className='w-full xl:w-64 order-first xl:order-last border-b xl:border-none'>
            <div className={`p-4 border-l border-blue-300 fixed bg-blue-50`}>
                <h4 className='font-bold '> Page Settings </h4>
                {items({Title, URL, ShowSidebar, theme, createState, item, props, ...rest})}
            </div>
        </div>
    )
}