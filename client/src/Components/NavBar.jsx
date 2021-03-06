import React, { useEffect, useState } from 'react';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';
import { MenuNames } from "./MenuNames";
import '../App.css';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';
import SearchBox from './SearchBox';

function Navbar(props) {
  const { sidebar, showSidebar, navClick } = props;
  const [ queryInput, setQueryInput ] = useState("");

  const onChange = (e) => {
    const value = e.target.value;
    setQueryInput(value);
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <div className="nav-menu searchbar"><SearchBox onChange={onChange} queryInput={queryInput}/></div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items'>
            <li className='navbar-toggle' onClick={showSidebar}>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {MenuNames.map((item, index) => {
              return (
                <li key={index} className={item.cName} onClick={() => navClick(item)}>
                  <Link to={item.path} className="nav-text">
                    <span>{item.icon}</span>
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;