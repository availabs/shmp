import React from "react"
import { Button, LinkButton } from '../Button'

import { useTheme } from "../../wrappers/with-theme"

const processArg = arg => {
  const {
    comp = null,
    type = "button",
    ...rest
  } = arg
  return {
    Comp: comp ? comp : type === "link" ? LinkButton : Button,
    type,
    ...rest
  }
}

const Header = ({ title, breadcrumbs, subtitle, actions=[] }) => {
    const theme = useTheme();
  	return (
      <header className={`${theme.headerBg} ${theme.ySpace} ${theme.headerShadow} px-4 sm:px-6 lg:px-8`}>

  	  	{breadcrumbs ?
  	  	(<div >
  		    <nav className="sm:hidden">
  		      {/*<a href="#" className="flex items-center text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
  		        <svg className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
  		          <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"/>
  		        </svg>
  		        Back
  		      </a>*/}
  		    </nav>
  		    <nav className="hidden sm:flex items-center text-sm leading-5 font-medium">
  		     {/* <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">Jobs
  		      </a>
  		      <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
  		        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
  		      </svg>
  		      <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">Engineering
  		      </a>
  		      <svg className="flex-shrink-0 mx-2 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
  		        <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"/>
  		      </svg>
  		      <a href="#" className="text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">Back End Developer
  		      </a>*/}
  		    </nav>
  	  </div>) : null }

  	  <div className={`${theme.contentWidth} md:flex md:items-center md:justify-between`}>
  	    <div className="flex-1 min-w-0">
  	      <h2 className={`text-2xl font-bold leading-7 ${theme.text} sm:text-3xl sm:leading-9 sm:truncate`}>
  	        {title}
  	      </h2>
  	      {subtitle ? (
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap">
      	      {/*
      		    <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
      		        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      		          <path fill-rule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clip-rule="evenodd"/>
      		          <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"/>
      		        </svg>
      		        Full-time
      		      </div>
      		      <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
      		        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      		          <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
      		        </svg>
      		        Remote
      		      </div>
      		      <div className="mt-2 flex items-center text-sm leading-5 text-gray-500 sm:mr-6">
      		        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      		          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
      		          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clip-rule="evenodd"/>
      		        </svg>
      		        $120k &ndash; $140k
      		      </div>
      		      <div className="mt-2 flex items-center text-sm leading-5 text-gray-500">
      		        <svg className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
      		          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/>
      		        </svg>
      		        Closing on January 9, 2020
      		      </div>*/}
  		        </div>) : null }
  	    </div>
  	    <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
    	    { actions.map(processArg)
              .map(({ Comp, ...rest }, i) => <Comp className="ml-2" key={ i } { ...rest }/>)
          }

  	    </div>
  	  </div>
  	</header>
  )
}

export default Header
