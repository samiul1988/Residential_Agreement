import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Link, NavLink, useRouteMatch, useParams } from "react-router-dom";

class Navbar extends React.Component {
    state = {
        ariaExpanded: false
    }
    navBarButtonClicked = () => {
        this.setState({
            ariaExpanded: !this.state.ariaExpanded
        });
    }
    render() {
        return (
            <div className="container-fluid m-0 p-0" id="navbar-container" >
            <div className="position-fixed w-100" style={{zIndex:5000}}>
                <nav className="navbar navbar-expand-lg navbar-dark bg-light">
                    <div className="float-sm-right ml-sm-2 mt-sm-4 ">
                        <h4 className="nav-header-text">DakBanglow Lease Management Portal</h4>
                    </div>
                </nav>
                </div>
            </div>
        );
    }
}
export default Navbar