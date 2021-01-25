import React from "react"

import { Link } from "react-router-dom"

import { useClickOutside } from "../utils"
import { useTheme } from "../../wrappers/with-theme"

export const NavMenu = ({ control, children }) => {
  const [open, setOpen] = React.useState(false),
    clickedOutside = React.useCallback(() => setOpen(false), []),
    [setRef] = useClickOutside(clickedOutside),
    theme = useTheme();
  return (
      <div 
        className={`${theme.navMenu} ${open ? theme.navMenuOpen : ''}`} 
        onMouseEnter={ e => setOpen(true) }
        onMouseLeave={ e => setOpen(false) } 
        ref={ setRef }
      >
        <div className={`h-full ${open ? ' text-right border-b border-blue-100' : 'text-right'}`} >
          {control}
        </div>
        { !open ? null :
          <div className={`${theme.navMenuBg} p-4 `} >
            { children }
          </div>
        }
      </div>
  )
}

export const NavMenuItem = ({ to = "#", children }) => {
  const theme = useTheme();
  return (
    <Link to={ to }>
      <div className={ `${ theme.transition } ${theme.navMenuItem}` }>
        { children }
      </div>
    </Link>
  )
}

export const NavMenuSeparator = () =>
  <div className="border-b-2 my-1"/>
