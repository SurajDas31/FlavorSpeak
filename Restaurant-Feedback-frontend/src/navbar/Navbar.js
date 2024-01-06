import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { getRole, getUserName, isLoggedIn, logout } from '../util/AuthUtil'
import { NavDropdown } from 'react-bootstrap';
import { useRef, useState } from 'react';
import Settings from '../user/settings/Settings';

function HomeNavbar() {


    const [settingsToggle, setSettingToggle] = useState(false);
    const auth = useRef(false);

    useState(() => {
        isLoggedIn().then(res => { auth.flag = res });
        console.log(auth);
    })

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav>
                            {
                                (!auth.flag) ?
                                    <Nav.Link href="/signin">Sign in</Nav.Link>
                                    :
                                    <NavDropdown title={getUserName()} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/auth/dashboard">Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => setSettingToggle(true)}>Settings</NavDropdown.Item>
                                        {(getRole() === 'ADMIN') ? <NavDropdown.Item >Add new Restaurant</NavDropdown.Item> : ""}
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

            <Settings show={settingsToggle} onHide={() => setSettingToggle(false)}/>
        </>
    );
}

export default HomeNavbar;