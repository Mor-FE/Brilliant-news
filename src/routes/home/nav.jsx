import { NavBar, Icon } from 'antd-mobile'
import React, { Component } from 'react'

class Nav extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    console.log(props)
  }
  render() {
    return (
      <div>
        <NavBar
          // leftContent="Back"
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <Icon key="1" type="ellipsis" />
          ]}
          style={{ background: 'eee' }}
          {...this.props}
        >
          {this.props.title}
        </NavBar>
      </div>
    )
  }
}
export default Nav
