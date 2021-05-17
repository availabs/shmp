import React, {useState} from 'react'
import {DmsButton} from "../../../../components/dms/components/dms-button";
const LargeView = ({Title, URL, ShowSidebar, theme, createState, item, props, ...rest}) => {
    return (
        <div className='w-full lg:w-64 order-first lg:order-last border-b lg:border-none'>
            <div className='fas fa-plue block lg:hidden'>page settings</div>
            <div className={`hidden lg:block p-4 border-l border-blue-300 fixed bg-blue-50`}>
                <h4 className='font-bold '> Page Settings </h4>
                <div>
                    <label className='pr-5'>Title</label>
                    <Title.Input
                        className={'bg-blue-50'}
                        autoFocus={true}
                        value={Title.value}
                        placeholder={'Title'}
                        onChange={Title.onChange}
                    />
                </div>
                <div>
                    <label className='pr-5'>URL</label>
                    <URL.Input
                        className={`ml-2 ${theme.text} bg-blue-50`}
                        autoFocus={true}
                        value={URL.value}
                        placeholder={'/url'}
                        onChange={URL.onChange}
                    />
                </div>
                <div>
                    <label className='pr-5'>Sidebar</label>
                    <ShowSidebar.Input
                        className={`ml-2 ${theme.text} w-0.5 inline-block`}
                        autoFocus={true}
                        value={ShowSidebar.value}
                        onChange={ShowSidebar.onChange}
                    />
                </div>
                <div className="mt-2 mb-4 max-w-2xl">
                    <DmsButton
                        className="w-full bg-blue-100"
                        buttonTheme='buttonPrimary'
                        large
                        type="submit"
                        label='Save'
                        action={{...createState.dmsAction, goBackAfterApiAction: false}}
                        item={item}
                        props={props}
                    />
                </div>

            </div>
        </div>
    )
}
export const pageSettings = (props) => {
    return (
        <React.Fragment>
            {LargeView(props)}
        </React.Fragment>
    )
}