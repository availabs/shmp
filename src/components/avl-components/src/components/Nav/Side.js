import React from "react"
import { Link } from 'react-router-dom'
import { useTheme } from "../../wrappers/with-theme"
import SidebarItem from './Item'

const MobileSidebar = ({open, toggle,logo = null, menuItems=[]}) => {
	const theme = useTheme();
	return (
	<div style={{display: open ? 'block' : 'none' }} className="md:hidden">
	    <div className="fixed inset-0 z-20 transition-opacity ease-linear duration-300">
	      <div className="absolute inset-0 bg-gray-600 opacity-75" />
	    </div>
	    <div  className="fixed inset-0 flex z-40">
	      <div  className="flex-1 flex flex-col max-w-xs w-full transform ease-in-out duration-300">
	        <div className="absolute top-0 right-0 -mr-14 p-1">
	          <button onClick={toggle} className="flex items-center justify-center h-12 w-12 rounded-full focus:outline-none focus:bg-gray-600">
	            <svg className="h-6 w-6 text-gray-900" stroke="currentColor" fill="none" viewBox="0 0 24 24">
	              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
	            </svg>
	          </button>
	        </div>
	        <div className={`flex-1 h-0 pt-2 pb-4 overflow-y-auto overflow-x-hidden ${theme.menuBg}`}>
	          	<div className='px-6 pt-4 pb-8 logo-text gray-900' >
	          		<Link to={'/'} className={`flex-shrink-0 flex items-center ${theme.text}`}>
          			{ logo }
          			</Link>
          	 	</div>
	          <nav className="flex-1">
	            {menuItems.map((page, i) => {
	            	return (
	          			<div key={ i } className={page.sectionClass}>
		            		<SidebarItem  to={ page.path } icon={page.icon} theme={theme} className={page.itemClass}>
		    					{ page.name }
		  					</SidebarItem>
		  					{page.children ? page.children.map((child,x) => {
		  						return (
		  							<SidebarItem key={ x } to={ child.path } icon={child.icon} theme={theme} className={child.itemClass}>
			    						{ child.name }
			  						</SidebarItem>
			  					)
		  					}) : ''}
	  					</div>
	            	)
	           	})}
	          </nav>
	        </div>

	      </div>
	      <div className="flex-shrink-0 w-14">
	        {/* Force sidebar to shrink to fit close icon */}
	      </div>
	    </div>
 	</div>
	)
}

const DesktopSidebar = ({menuItems = [], fixed, topMenu, logo = null, ...rest}) => {
	const theme = useTheme();
	return(
	<div className={ `hidden md:flex md:flex-shrink-0 z-20 ${ theme.sidebarBg } ${ fixed ? 'fixed top-0 h-screen' : '' } ${ theme.sidebarBorder }` }>
      <div className={ `flex flex-col w-${ theme.sidebarW }` }>
        <div className={ `w-${ theme.sidebarW } flex-1 flex flex-col pb-4 overflow-y-auto overflow-x-hidden scrollbar`  }>
          <div className='h-16'>
          	<Link to={'/'} className={`${theme.text}`}>
          		{ logo }
          	</Link>
          </div>

          {topMenu ? <div className='h-16'>{topMenu}</div> : null}
          <nav className="flex-1">
            {menuItems.map((page, i) => {
            	return (
          			<div key={ i } className={page.sectionClass}>
	            		<SidebarItem  to={ page.path } icon={page.icon} theme={theme} className={page.itemClass}>
	    					{ page.name }
	  					</SidebarItem>
	  					{page.children ? page.children.map((child,x) => {
	  						return (
	  							<SidebarItem key={ x } to={ child.path } icon={child.icon} theme={theme} className={child.itemClass}>
		    						{ child.name }
		  						</SidebarItem>
		  					)
	  					}) : ''}
  					</div>
            	)
           	})}
          </nav>
        </div>

      </div>
    </div>
    )
}


export default ({ ...props }) => (
	<React.Fragment>
		<MobileSidebar {...props} />
		<DesktopSidebar {...props} />
	</React.Fragment>
)
