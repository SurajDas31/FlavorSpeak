import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { BrowserRouter, Link, redirect } from 'react-router-dom';
import { isLoggedIn, logout } from '../util/AuthUtil'
import { NavDropdown } from 'react-bootstrap';

function HomeNavbar() {
    return (

        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">More deets</Nav.Link>
                        {
                            (!isLoggedIn()) ?
                                <Nav.Link>
                                    <Link to="/signin">Sign In</Link>
                                </Nav.Link>
                                :
                                <NavDropdown title="Virus" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Settings</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item onClick={logout}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default HomeNavbar;