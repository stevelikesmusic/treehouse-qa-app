require('../styles/global.scss')
import React from 'react'
import { IndexLink } from 'react-router'

export default React.createClass({
  render() {
    return (
      <div>
        <IndexLink to="/">
          <img className="logo" src="/images/logo-1.svg" />
        </IndexLink>
        {this.props.children}
      </div>
    )
  }
})