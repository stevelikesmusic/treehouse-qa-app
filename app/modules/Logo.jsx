require('../styles/global.scss')
import React from 'react'
import { Link } from 'react-router'
import logo from '../../public/images/logo-1.svg'


export default React.createClass({
  render() {
    return (
      <Link to="/">
        <img className="logo" src={logo} />
      </Link>
    )
  }
})