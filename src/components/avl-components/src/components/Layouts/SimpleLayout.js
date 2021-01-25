import React, { Component } from 'react';

class Layout extends Component {
  static defaultProps = {
      fixed: false,
      maxWidth: '',
      nav: 'side',
      theme: 'light'
  }

  render () {
    const theme = this.props.theme;//themes[this.props.theme]
    return (
      <div className={`${theme.bg}`}>
          <main>
              { this.props.children }
          </main>
      </div>
    )
  }
}

export default Layout
