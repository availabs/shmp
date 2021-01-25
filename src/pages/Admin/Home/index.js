import React  from "react"
// import {useTheme} from '@availabs/avl-components'
import AdminLayout from '../Layout'


const Home = ({children}) => {
	// const theme = useTheme()
	return (
	  	<AdminLayout>
	  		<div className="w-full max-w-7xl mx-auto">
	  			<div className='pt-4 pb-3'>
          			<h3 className='inline font-bold text-3xl'>Home</h3>
        		</div>
	  		</div>
		</AdminLayout>
	)
}

export default {
  path: "/admin",
  exact: true,
  auth: true,
  component: Home,
  layout: 'Simple'
}