import React, { Component } from 'react';
import Logo from './images/LogoBook.png';
import UserIcon from './images/userIcon.png'
import PropTypes from 'prop-types';
import './css/Header.css';
import { NavLink, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from "react-router-bootstrap";
//Data
import items from '../../data/menu';
import itemsAdmin from '../../data/menuAdmin';

import {Logout} from '../../actions/loginActions.js';



class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoginSuccess: false,
            isLogout:true
        }
    }
    static propTypes = {
        title: PropTypes.string.isRequired
        //items: PropTypes.array.isRequired
    }

    handleLogout= (e)=>{
        e.preventDefault();
        this.props.dispatch(Logout());
    }

   
    render() {
        const { title } = this.props;      
        
        return (
            <Navbar variant="dark" bg="dark" expand="lg">
                <Navbar.Brand href="#" className="Logo"><img src={Logo} alt="logo" /></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-main" />
                <Navbar.Collapse id="navbar-main">
                    <Nav className="navbar-nav mr-auto">
                        {items && items.map((item, key) =>
                            <li key={key} className="nav-item">
                                <NavLink to={item.url} className="nav-link">
                                    {item.title}
                                </NavLink>
                            </li>
                        )}
                    </Nav>
                     {/* Condicional Login */}
                    <Nav className="pull-right">
                        {this.props.isLoginSuccess && !this.props.isLogout ?
                            <NavDropdown
                                title={
                                    <div className="pull-left">
                                        <img className="user-icon"
                                            src={UserIcon}
                                            alt="user pic"
                                        />
                                        Charly
                                </div>
                                }
                                id="basic-nav-dropdown">

                                {itemsAdmin && itemsAdmin.map((item, key) =>
                                    <LinkContainer to={item.url} key={key}>
                                        <NavDropdown.Item eventKey={key}>{item.title}</NavDropdown.Item>
                                    </LinkContainer>
                                )}


                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick = {this.handleLogout}>
                                    <i className="fa fa-sign-out"></i> Logout
                </NavDropdown.Item>
                            </NavDropdown>
                            :
                            <li key='4' className="nav-item pull-right">
                                <NavLink to='/login' className="nav-link">
                                    Login
                                </NavLink>
                            </li>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("Estado en header")
    console.log(state)
    return {
        isLoginSuccess: state.loginData.isLoginSuccess,
        isLogout: state.loginData.isLogout        
    }
}
export default connect(mapStateToProps)(Header);