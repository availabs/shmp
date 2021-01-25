import React  from "react"
import {SideNav, useTheme} from '@availabs/avl-components'
import AuthMenu from 'pages/Auth/AuthMenu'
// import logo from './Logo.js'

const AdminLayout = ({children}) => {
	const theme = useTheme()
	return (
	  	<div className="w-full">
	  		<div className="flex min-h-screen">
		  		<SideNav  
		  			logo={<div className='border-b border-gray-200 p-4'><h4>Testing</h4></div>}
		  			topMenu={<div className='border-b border-gray-200 pb-3'><AuthMenu /></div>}
		    		menuItems={[
		    			
		    			{
			                name: 'Meta',
			                id: 0,
			                path: `/meta/`
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