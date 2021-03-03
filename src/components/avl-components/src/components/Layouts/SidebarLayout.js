import React, { Component } from 'react';

import SideNav from '../Nav/Side'
import TopNav from '../Nav/Top'

import HeaderBar from "../Header/HeaderComponent"

import get from "lodash.get"

class Layout extends Component {
  state = {
    menuOpen: false
  }
  static defaultProps = {
      fixed: false,
      maxWidth: '',
      headerBar: true,
      navBar: 'side',
      nav: null
  }

  toggleMenu = () => {
    this.setState({menuOpen: !this.state.menuOpen})
  }

  render () {
    const theme = this.props.theme,
      navBar = this.props.nav || this.props.navBar;
    return (
      <div className={ `
          ${ theme.bg } ${ theme.text }
          min-h-screen w-full flex flex-col
        ` }>
        {navBar === 'top' ? (
          <div className={this.props.fixed ? `fixed left-0 top-0 w-full z-10` : `w-full`}>
            <TopNav
              logo={this.props.logo}
              open={this.state.menuOpen}
              toggle={this.toggleMenu}
              menuItems={this.props.menus}
              fixed={this.props.fixed}
              width={this.props.maxWidth}
            />
          </div>
        ) : null }
        {this.props.headerBar ? (
          <div className={`${this.props.fixed ? `fixed left-0 top-0 w-full z-10 ${navBar === 'top' ? '' : '' }` : ''}`}>
            <div className={`${this.props.maxWidth} mx-auto`} >
              <div className={ `
                  fixed left-0 right-0 top-0
                  ${ navBar === 'side' ? `md:ml-${ theme.sidebarW}` : '' }
                ` }>
                <HeaderBar navBar={ navBar }
                  title={ get(this.props, ["headerBar", "title"], null) }>
                  { get(this.props, ["headerBar", "children"], [])
                      .map((child, i) =>
                        typeof child === "function" ?
                          React.createElement(child, { key: i }) :
                        typeof child === "string" ? child :
                        React.cloneElement(child, { key: i })
                      )
                  }
                </HeaderBar>
              </div>
            </div>
          </div>
        ) : null }

      	<div className={ `
          flex-1 flex items-stretch flex-col
          ${ this.props.maxWidth ? this.props.maxWidth : 'w-full' }
        ` }>

          { navBar !== 'side' ? null : (
            <SideNav
              open={this.state.menuOpen}
              toggle={this.toggleMenu}
              menuItems={this.props.menus}
              fixed={this.props.fixed}/>
            )
          }

            <div className={ `
                h-full flex-1 flex flex-col
                ${ this.props.headerBar || (navBar === "top") ?
                    `mt-${ theme.topNavHeight || 16 }` : '' }
                ${ this.props.fixed && (navBar === 'side') ?
                    `md:ml-${ theme.sidebarW }` : '' }
              ` }
            >
                { this.props.children }
            </div>


        </div>
      </div>
    )
  }
}

export default Layout
