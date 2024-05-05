import React from 'react'
import { FaHome } from "react-icons/fa";
const Header = () => {
  return (
    <div className="navbar bg-red-700 text-neutral-content">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </div>
    </div>
    <a className="btn btn-ghost text-xl">JTMK STAFF DIRECTORY</a>
  </div>
  <div className="navbar-center hidden lg:flex">

  </div>
  <div className="navbar-end">
    <a href='/dashboard/view/lecturerDirectory' className="btn"><FaHome/></a>
  </div>
</div>
  )
}

export default Header