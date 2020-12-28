import React, { Component } from 'react'
import { Link } from "gatsby";

class NotFound extends Component {
  render() {
    return (
      <>
        Punten, halaman yang kamu cari nggak ketemu.
        <div>
          <Link to="/">Balik ke Home</Link>
        </div>
      </>
    )
  }
}

export default NotFound;