import React from "react"
import { Link } from 'react-router-dom'
import { useTheme } from "../../wrappers/with-theme"
import NavItem from './Item'

const MobileMenu = ({open, menuItems=[], customTheme}) => {
  const theme = Object.assign({},useTheme(), customTheme);
  return (
  <div className={`${open ? 'sm:hidden relative' : 'hidden'} ${theme.menuBg}`}>
      <div className="pt-2 pb-3">
        {menuItems.map((page,i) => {
            return (
              <NavItem key={i} to={ page.path } icon={page.icon} theme={theme}>
                {page.name}
              </NavItem>
            )
          })}
    </div>
    <div className="pt-4 pb-3 border-t border-gray-200">
      {/* bottom menu */}
      <div className="mt-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
       {/* iterate over bottom nav items here */}
      </div>
    </div>
  </div>
  )
}


const DesktopMenu = ({menuItems=[], open, toggle, fixed, width, logo, rightMenu, customTheme=false}) => {
  const theme = Object.assign({},useTheme(), customTheme);
  return (
    <div className={ `
      h-${ theme.topNavHeight || 16 } ${ theme.sidebarBg }
      ${ theme.topMenuBorder } ${ theme.topMenuScroll }
    ` }>
      <div className={ `
        ${ theme.contentWidth } flex justify-between
        h-${ theme.topNavHeight || 16 }
      ` }>
        <div className="flex">
          <Link to={'/'} className={`flex-shrink-0 flex items-center ${theme.text}`}>
            {logo}
          </Link>
          <div className="hidden sm:-my-px sm:ml-6 sm:flex">
            {menuItems.map((page,i) => {
              return (
                <NavItem key={i} to={page.path} icon={page.icon} customTheme={customTheme} type='top'>
                  {page.name}
                </NavItem>
              )
            })}
          </div>
        </div>

        <div className="mr-2 flex items-center sm:hidden">
          {/* Mobile menu button */}
          <button onClick={toggle} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out">
            {/* Menu open: "hidden", Menu closed: "block" */}
            <svg className={`${open ? 'hidden' : 'block'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            {/* Menu open: "block", Menu closed: "hidden" */}
            <svg className={`${open ? 'block' : 'hidden'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="hidden sm:block lg:ml-4">
          {rightMenu ? rightMenu : ''}
        </div>

      </div>
    </div>
  )
}


export default (props) => {
  const theme = Object.assign({},useTheme(), props.customTheme)
  const [open, setOpen] = React.useState(false)
    //clickedOutside = React.useCallback(() => setOpen(false), []),
    //[setRef] = useClickOutside(clickedOutside),
    //theme = useTheme()

  return (
    <nav className={ `
      ${ theme.menuBg } ${ theme.sidebarBorder }
      h-${ theme.topNavHeight || 16 }
    ` }>
      <DesktopMenu

        toggle={e => {
          // console.log('toggle menu', open)
          return setOpen(!open)
        }}
        {...props}
        open={open}
        />
      <MobileMenu  {...props} open={open}/>
    </nav>
  )
}
