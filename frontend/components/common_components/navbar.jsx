import React from "react";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

const msp = (state) => {
  return ({
    currentUser: state.entities.users[state.session.id],
  });
}

const Navbar = (props) => {
  if (!props.currentUser && props.klass !== "songs-mgmt-page") return null;
  switch (props.klass) {
    case "homepage":
      return (
        <div className="navbar">
          <NavLink to="/stream" activeClassName="active">Stream</NavLink> 
          <NavLink to="/charts/top" activeClassName="active">Charts</NavLink>
        </div>
      );
    case "user-show-page":
      return (
        <div className="navbar" style={{borderBottom: 0}}>
          <NavLink to={`/users/${props.onPageArtistId}`} activeClassName="active">Songs</NavLink> 
        </div>
      );
    case "songs-mgmt-page":
      return (
        <div className="navbar">
          <NavLink to="/upload" activeClassName="active">Upload</NavLink>
          <NavLink to="/you/songs" activeClassName="active">Your Songs</NavLink>
        </div>
      );
    default:
      return null;
  }
};

export default withRouter(connect(msp, null)(Navbar));
