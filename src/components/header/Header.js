import React, { Component } from 'react';
import './Header.css';
import {
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    Collapse
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase';
import { connect } from 'react-redux';
import Loader from "react-loader-spinner";

const mapStateToProps = state => {
    return {
        user: state.user.user
    }
}

class Header extends Component {
    state = {
        isOpen: false
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // console.log("Header: props", props);

    componentDidMount() {
        // console.log("Header: componentDidMount", this.props);
    }

    componentDidUpdate() {
        // console.log("Header: componentDidUpdate", this.props);
    }

    render() {
        return (
            <div className="header" style={{height: "56px"}}>
                <Navbar color="dark" dark expand="md" fixed="top">
                    <NavbarBrand href="/">Photo Gallery</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>

                    {!this.props.isLoadingUser ? (
                        
                            <Loader
                            type="Oval"
                            color="#efb6b2"
                            height={20}
                            width={20}
                            timeout={3000} />): <div></div>}
                    {this.props.user ? (
                        <Nav className="ml-auto">
                            <NavItem>
                                <NavLink exact to="/logout" className="NavLink" onClick={()=>auth.signOut()}>Logout</NavLink>
                            </NavItem>
                        </Nav>) : (
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink exact to="/login" className="NavLink">Login</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/signup" className="NavLink">Signup</NavLink>
                            </NavItem>
                        </Nav>)}
                    
                    </Collapse>
                </Navbar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Header);
