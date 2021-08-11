import React  from "react"
import {/*useTheme,*/ SideNav, ThemeContext} from '@availabs/avl-components'
// import { useTheme, SideNav } from 'components/avl-components/src/'
import AuthMenu from 'pages/Auth/AuthMenu'
import logo from './Logo.js'
import Theme from './adminTheme'

/*const AdminTheme = {
  sidebarBg: 'bg-white',
  navitemSide: 'px-8 inline-flex items-center border-b border-r border-gray-200 text-base font-normal text-grey-800 hover:pb-4 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out',
  //navitemSideActive: 'px-8 inline-flex items-center border-b border-r border-gray-200 text-base font-normal text-blue-500 hover:pb-4 focus:outline-none focus:text-gray-700 focus:border-gray-300 transition duration-150 ease-in-out'
}*/

const AdminLayout = ({children}) => {
	
	return (
	  	<ThemeContext.Provider value={ Theme }>
		  	<div className="w-full">
		  		<div className="flex min-h-screen">
			  		<SideNav  
			  			//customTheme={AdminTheme}
			  			logo={<div className=''>{logo('SHMP')}</div>}
			  			topMenu={<div className='border border-gray-200'><AuthMenu /></div>}
			    		menuItems={[
			    			
			    			{
				                name: 'Home',
				                path: `/admin/`,
				                //icon: 'fa fa-home',
				                className: 'font-medium text-lg'
				                
				            },
			    			{
				                name: 'Plan',
				                path: `/meta/`,
				                //icon: 'fa fa-edit',
				                className: 'font-medium text-lg'
				            },
				            {
				                name: 'Data Sources',
				                className: 'font-medium py-2 text-lg hover:text-blue-500 text-blue-500 text-xs mt-5 cursor-pointer',
				                children: [
				                	{
						                name: 'Asset Inventory',
						                path: `/data/assets`, 
										//icon: 'far fa-building',
						                className: 'py-0'
						            },
					    			{
						                name: 'Actions',
						                path: `/data/actions`,
						                //icon: 'fa fa-toolbox',
						                className: 'py-0'
						            },
						            {
						                name: 'Capabilities',
						                path: `/data/capabilities`,
						                className: 'py-0',
						                //icon: 'fa fa-buffer'
						            },
				                ]
				            },
				            {
				                name: 'Scenario Map',
				                className: 'font-medium py-2 text-lg hover:text-blue-500 text-blue-500 text-xs mt-5 cursor-pointer',
				            }


			    		]}
			    		fixed={true}
			    	/>
			    	<div className={`flex-1 md:ml-${Theme.sidebarW} ${Theme.bg}`} >	
		    			{children}
		    		</div>
		    	</div>
			</div>
		</ThemeContext.Provider>
	)
}

export default AdminLayout