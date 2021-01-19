import React, { Component } from "react"; import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBIcon
} from "mdbreact";
import { BrowserRouter as Router } from 'react-router-dom';
import { history } from '../../history'


class Menu extends Component {
  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const bgPink = { backgroundColor: '#A239CA', margin: "0px", padding: "5px" }
    const goExit = () => {
      history.push('/');
      window.location.reload()
    }
    
    return (
      <Router>
        <MDBNavbar style={bgPink} dark expand="md" fixed="top">
          <MDBNavbarBrand>
            <MDBIcon icon="dragon" className="m-3" />
            <strong className="white-text h6">DESAFIO-DRAGON</strong>
            <MDBIcon icon="dragon" className="m-3" />
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>

            <MDBNavbarNav right>
              <MDBNavItem >
                <MDBNavLink to="/" onClick={goExit} className="white-text h6 text-center m-3">
                  Sair       <MDBIcon far icon="arrow-alt-circle-right" className="mr-2" />
                </MDBNavLink>
              </MDBNavItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      </Router>
    );
  }
}

export default Menu;