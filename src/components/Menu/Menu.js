import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link } from 'react-router-dom'
export default props => {
  return (
    <Menu>
      <Link to="/">
        Home
      </Link>

      <Link to="/videos">
        Youtube
      </Link>

      <Link to="/music">
        Music
      </Link>

      <Link to="/messages">
        Messages
      </Link>
    </Menu>
  )
}