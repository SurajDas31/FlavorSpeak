import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { REST_URL, isLoggedIn, login } from "../../util/AuthUtil";
import { Avatar, Box, Button, Checkbox, CssBaseline, FormControlLabel, Grid, Paper, Link, TextField, ThemeProvider, Typography, createTheme, Snackbar, Alert } from "@mui/material";
import bg from '../img/auth-bg.jpg'
import { Card } from "react-bootstrap";
import { ShowAlert } from "../../util/AlertUtil";

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useState(() => {
        isLoggedIn().then(res => {
            if (res)
                navigate("/auth/dashboard");
        })
    },[])


    const [alertShow, setAlertShow] = useState(false);

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertShow(false);
    };

    let loginHandler = async (event) => {
        event.preventDefault();

        try {
            var res = await fetch(REST_URL + "/api/v1/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
                headers: { "Content-Type": "application/json" }
            })

            if (res.status === 200) {
                let data = await res.json()
                console.log(data);
                login(data);
                window.location.href = "/auth/dashboard"
            } else if (res.status === 400) {
                setErrorMessage("Email id not found")
                setAlertShow(true);
            } else if (res.status === 401) {
                setErrorMessage("Incorrect Password")
                setAlertShow(true);
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("Host not found")
            setAlertShow(true);
        }

    }

    const defaultTheme = createTheme();


    return (
        <>
            <ShowAlert toggle={alertShow} handleClose={closeAlert} message={errorMessage} />

            <ThemeProvider theme={defaultTheme}>

                <Grid container component="main"
                    sx={{
                        height: '100vh', backgroundImage: `url(' ${bg} ')`, backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        display: 'flex', justifyContent: 'flex-end'
                    }}>
                    <CssBaseline />
                    <Grid item component={Card}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <Box component="form" noValidate onSubmit={loginHandler} sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {/* <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            /> */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container sx={{ justifyContent: 'space-around' }}>
                                    <Grid item >
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/signup" variant="body2">
                                            {"Don't have an account?"}
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        </>
    );

}