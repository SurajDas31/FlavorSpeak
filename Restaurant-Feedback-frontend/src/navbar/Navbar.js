
import { getRole, getUserName, isLoggedIn, logout } from '../util/AuthUtil'
import { useRef, useState } from 'react';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Settings from '../user/settings/Settings';
import AddRestaurant from '../user/settings/admin/AddRestaurant';
import UserList from '../user/settings/admin/UserList';
import { AppBar, Avatar, Box, Button, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import { displayProtectedProfileImage } from '../util/Util';
import { useNavigate } from 'react-router-dom';

function HomeNavbar() {

    const navigate = useNavigate();

    const [settingsToggle, setSettingToggle] = useState(false);
    const [addRestaurantToggle, setAddRestaurantToggle] = useState(false);
    const [userListToggle, setUserListToggle] = useState(false);
    const [auth, setAuth] = useState(false)

    const settings = ['Profile', 'Dashboard', 'Logout'];

    const adminSettings = ['AddRestaurant', 'User List'];

    const [anchorElUser, setAnchorElUser] = useState(null);

    const [profilePic, setProfilePic] = useState(null);

    useState(() => {
        isLoggedIn().then(res => {
            setAuth(res)
            displayProtectedProfileImage().then(res =>
                setProfilePic(res)
            )
        });
    })

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const menuItems = (params) => {
        handleCloseUserMenu()

        switch (params) {
            case "Profile":
                setSettingToggle(true)
                break;
            case "Dashboard":
                navigate('/auth/dashboard')
                break;
            case "Logout":
                logout()
                break;
            case "AddRestaurant":
                setAddRestaurantToggle(true);
                break;
            case "User List":
                setUserListToggle(true);
                break;
            default:
                break;
        }
    }

    return (
        <>
            {/* <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" data-bs-theme="dark" bg="dark" variant="dark">
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
            </Navbar> */}

            <AppBar color='inherit' sx={{ zIndex: 1 }}>
                <Toolbar variant='regular'>

                    <RestaurantMenuIcon sx={{ display: { xs: 'flex', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'block', md: 'flex' },
                            fontFamily: 'cursive',
                            fontWeight: 500,
                            letterSpacing: '.2rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}>
                        FlavorSpeak
                    </Typography>

                    <Box sx={{ position: 'absolute', right: '5%' }}>

                        {auth ?
                            <>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt={getUserName()} src={`${profilePic}`} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    {(getRole() === 'ADMIN') ? adminSettings.map((setting) => (
                                        <MenuItem key={setting} onClick={() => menuItems(setting)}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    )) : ""}

                                    {settings.map((setting) => (
                                        <MenuItem key={setting} onClick={() => menuItems(setting)}>
                                            <Typography textAlign="center">{setting}</Typography>
                                        </MenuItem>
                                    ))}


                                </Menu>
                            </> :
                            <Button href="/signin" color="inherit">Login</Button>}
                    </Box>

                </Toolbar>
            </AppBar >

            <Settings show={settingsToggle} onHide={() => setSettingToggle(false)} />

            <AddRestaurant show={addRestaurantToggle} onHide={() => setAddRestaurantToggle(false)} />

            <UserList show={userListToggle} onHide={() => setUserListToggle(false)} />
        </>
    );
}

export default HomeNavbar;