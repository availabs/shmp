import React from "react"

import { Link } from "react-router-dom"

import { useClickOutside } from "../utils"
import { useTheme } from "../../wrappers/with-theme"
import withAuth from "../../wrappers/with-auth"

export const UserMenu = withAuth(({ user = {}, children }) => {
  const [open, setOpen] = React.useState(false),
    clickedOutside = React.useCallback(() => setOpen(false), []),
    [setRef] = useClickOutside(clickedOutside),
    theme = useTheme();
  return !user.authed ?
      <Link to="/auth/login">
        <div className={ `
            flex items-center rounded cursor-pointer ${ theme.textInfo }
            border-transparent hover:${ theme.borderInfo }
            ${ theme.transition } flex items-center justify-center
          ` }
          style={ {
            width: "2.5rem", height: "2.5rem",
            borderRadius: "1.25rem", fontSize: "1.15rem",
            borderWidth: "3px"
          } }>
          <span className="fas fa-user"/>
        </div>
      </Link>
    :
      <div className="relative" ref={ setRef }>
        <div className={ `
            flex items-center rounded cursor-pointer ${ theme.textInfo }
            ${ open ? theme.borderInfo : "border-transparent" }
            hover:${ theme.borderInfo } ${ theme.transition } flex items-center justify-center
          ` }
          style={ {
            width: "2.5rem", height: "2.5rem",
            borderRadius: "1.25rem", fontSize: "1.15rem",
            borderWidth: "3px"
          } }
          onClick={ e => setOpen(!open) }>
          <span className="fas fa-user"/>
        </div>
        { !open ? null :
          <div className={ `${ theme.accent1 } mt-1 p-2 right-0 absolute ${ theme.text }` }
            style={ { top: "100%", minWidth: "8rem" } }>
            <div className="mb-1 border-b-2">
              { user.email }
            </div>
            { children }
          </div>
        }
      </div>
})

export const UserMenuItem = ({ to = "#", children }) => {
  const theme = useTheme();
  return (
    <Link to={ to }>
      <div className={ `rounded cursor-pointer px-2 ${ theme.transition } hover:${ theme.accent2 }` }>
        { children }
      </div>
    </Link>
  )
}

export const UserMenuSeparator = () =>
  <div className="border-b-2 my-1"/>
