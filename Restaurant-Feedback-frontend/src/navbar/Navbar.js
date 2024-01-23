import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { getRole, getUserName, isLoggedIn, logout } from '../util/AuthUtil'
import { NavDropdown } from 'react-bootstrap';
import { useState } from 'react';
import Settings from '../user/settings/Settings';
import AddRestaurant from '../user/settings/admin/AddRestaurant';
import UserList from '../user/settings/admin/UserList';

function HomeNavbar() {


    const [settingsToggle, setSettingToggle] = useState(false);
    const [addRestaurantToggle, setAddRestaurantToggle] = useState(false);
    const [userListToggle, setUserListToggle] = useState(false);
    const [auth, setAuth] = useState(false)

    useState(() => {
        isLoggedIn().then(res => {
            setAuth(res)
        });
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
                                (!auth) ?
                                    <Nav.Link href="/signin">Sign in</Nav.Link>
                                    :
                                    <NavDropdown title={getUserName()} id="basic-nav-dropdown">
                                        <NavDropdown.Item href="/auth/dashboard">Dashboard</NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => setSettingToggle(true)}>Settings</NavDropdown.Item>
                                        {(getRole() === 'ADMIN') ?
                                            <>
                                                <NavDropdown.Item onClick={() => setUserListToggle(true)}>User List</NavDropdown.Item>
                                                <NavDropdown.Item onClick={() => setAddRestaurantToggle(true)}>Add new Restaurant</NavDropdown.Item>
                                            </>
                                            : ""}
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

            <Settings show={settingsToggle} onHide={() => setSettingToggle(false)} />

            <AddRestaurant show={addRestaurantToggle} onHide={() => setAddRestaurantToggle(false)} />

            <UserList show={userListToggle} onHide={() => setUserListToggle(false)} />
        </>
    );
}

export default HomeNavbar;