import React  from "react"
import {useTheme, SideNav} from '@availabs/avl-components'
//import { SideNav } from 'components/avl-components/src/components'
import AuthMenu from 'pages/Auth/AuthMenu'
import logo from './Logo.js'

const AdminLayout = ({children}) => {
	const theme = useTheme()
	return (
	  	<div className="w-full">
	  		<div className="flex min-h-screen">
		  		<SideNav  
		  			logo={<div className='border-b border-gray-200'>{logo('SHMP')}</div>}
		  			topMenu={<div className='border-b border-gray-200 pb-3'><AuthMenu /></div>}
		    		menuItems={[
		    			
		    			{
			                name: 'Home',
			                path: `/admin/`,
			                //icon: 'fa fa-home',
			                className: 'font-medium text-lg'
			                
			            },
		    			{
			                name: 'Plan',
			                path: `/cms/`,
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
		    	<div className={`flex-1 md:ml-${theme.sidebarW}`}>	
	    			{children}
	    		</div>
	    	</div>
		</div>
	)
}

export default AdminLayout