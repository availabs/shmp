import React from "react"
import Theme from 'Theme'
import { NavMenu, NavMenuItem, NavMenuSeparator, NavItem, withAuth } from '@availabs/avl-components'
// import { NavMenu, NavMenuItem, NavMenuSeparator, NavItem, withAuth } from 'components/avl-components/src'


export default withAuth(({ title, shadowed = true, user, children }) => {
  // const theme = useTheme();
  return (
    <div className="h-full">
      {!user.authed ? <NavItem to="/auth/login" type='top'>Login</NavItem> :
      <NavMenu control={
            <div className={`px-0 xl:px-6 text-sm text-gray xl:text-white font-normal tracking-widest`}>
              <div>{user.email ? user.email : ''}</div>
              <div className='text-xs -my-1 text-left text-gray-400'>{user.groups[0] ? user.groups[0] : ''}</div>
            </div>
        } customTheme={Theme}>
        { user.authLevel < 5 ? null :
        <NavMenuItem to="/meta" className='hover:text-gray-400'>
            Admin Panel
        </NavMenuItem>
        }
        { /* user.authLevel < 5 ? null :
            <NavMenuItem to="/auth/project-management">
            Manage Users
            </NavMenuItem>
        */ }
        {/*<NavMenuItem to="/auth/profile">
          Profile
        </NavMenuItem>*/}
        <NavMenuSeparator />
        <NavMenuItem to="/auth/logout" className='text-2xl hover:text-gray-400'>
          Logout
        </NavMenuItem>
      </NavMenu>
      }
    </div>
  )
})
