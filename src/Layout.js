// Layout.js
import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { MarkGithubIcon } from "@primer/octicons-react";

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-dark">
        <Link to="/"><span className="navbar-brand mb-0 h1 text-white">Currency Exchange Rates</span></Link>
        <Link to="/singleConversion"><span className="navbar-brand mb-0 h1 text-white">Single Conversion</span></Link>
      </nav>
      <div class="container-fluid">
            <div class="row color1" style={{ color: '#003030'}}>
            </div>
            <div class="row color2">
            </div>
      </div>
      <div className="container py-3">
        {props.children}
      </div>
      <footer className="p-3 bg-dark">
        <div>
          <span className="mr-3 text-secondary text-white">Built by  jones89-dan <a href="https://github.com/jones89-dan" target="_blank" rel="noopener noreferrer"><MarkGithubIcon size={16} /></a> </span>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Layout;
