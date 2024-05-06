
import { useNavigate } from "react-router-dom";
import "./SignUp.css"
import { useEffect, useState } from "react";
import { REST_URL } from "../../util/AuthUtil";
import { Alert, Avatar, Box, Button, Checkbox, Container, CssBaseline, FormControlLabel, Grid, Link, TextField, ThemeProvider, Typography, createTheme } from "@mui/material";
import { ShowAlert } from "../../util/AlertUtil";

export default function SignUp() {

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [mobileNo, setMobileNo] = useState("")
    const [errorMessage, setErrorMessage] = useState("");

    const [passwordMatching, setPasswordMatching] = useState(false);

    const [alertShow, setAlertShow] = useState(false);

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertShow(false);
    };


    const signUpHandler = async (event) => {
        event.preventDefault();

        try {
            var res = await fetch(REST_URL + "/api/v1/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    password: password,
                    mobileNo: mobileNo,
                    role: "USER"
                }),
                headers: { "Content-Type": "application/json" }
            })

            if (res.status === 201) {
                navigate("/signin")
            } else if (res.status === 409) {
                setAlertShow(true);
                setErrorMessage("User already present")
            }
        } catch (error) {
            console.error(error);
            setAlertShow(true);
            setErrorMessage("Host not found")
        }
    }

    const defaultTheme = createTheme();

    return (
        // <>
        //     <Container fluid>
        //         <Row>
        //             <Col sm={8} style={{ padding: 0 + 'px' }}>
        //                 <div className="left-bg"></div>
        //             </Col>
        //             <Col sm={4} className="SignUpLayout">
        //                 <Container>
        //                     <Alert className="mb-5" key={"danger"} variant={"danger"} show={errorFlag}>
        //                         {errorMessage}
        //                     </Alert>

        //                     <Form onSubmit={signUpHandler}>
        //                         <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
        //                             <Form.Control type="text" placeholder="John" id="firstName" onChange={(e) => { setFirstName(e.target.value) }}
        //                                 required />
        //                         </FloatingLabel>
        //                         <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
        //                             <Form.Control type="text" placeholder="Doe" id="lastName" onChange={(e) => { setLastName(e.target.value) }}
        //                                 required />
        //                         </FloatingLabel>
        //                         <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
        //                             <Form.Control type="email" placeholder="name@example.com" id="email" onChange={(e) => { setEmail(e.target.value) }}
        //                                 required />
        //                         </FloatingLabel>
        //                         <FloatingLabel controlId="floatingMobileNo" label="Mobile No" className="mb-3">
        //                             <Form.Control type="text" placeholder="9876543210" id="mobileNo" onChange={(e) => { setMobileNo(e.target.value) }}
        //                                 required />
        //                         </FloatingLabel>
        //                         <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
        //                             <Form.Control type="password" placeholder="Password" id="password" onChange={(e) => { setPassword(e.target.value) }}
        //                                 required />
        //                         </FloatingLabel>
        //                         <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
        //                             <Form.Control type="password" placeholder="Confirm password"
        //                                 id="confirmPassword" onChange={(e) => { setConfirmPassword(e.target.value) }}
        //                                 isInvalid={password !== confirmPassword}
        //                                 isValid={password === confirmPassword}
        //                                 required />
        //                             <Form.Control.Feedback type="invalid" tooltip>Password is not same</Form.Control.Feedback>
        //                         </FloatingLabel>
        //                         <div className="SignFormBottomBar">
        //                             <Button type="submit" variant="primary">Sign Up</Button>
        //                             <Link to="/signin">Already have an account?</Link>
        //                         </div>

        //                     </Form>
        //                 </Container>
        //             </Col>
        //         </Row>
        //     </Container>
        // </>

        <>

            <ThemeProvider theme={defaultTheme}>
                <ShowAlert toggle={alertShow} handleClose={closeAlert} message={errorMessage} />
                <Container component="main" maxWidth="xs">
                    {/* <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={errorFlag}
                    autoHideDuration={2000}
                    onClose={() => setErrorFlag(false)}
                    message={errorMessage}
                /> */}
                    <CssBaseline />
                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            {/* <LockOutlinedIcon /> */}
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign up
                        </Typography>
                        <Box component="form" onSubmit={signUpHandler} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        onChange={(e) => { setFirstName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Last Name"
                                        name="lastName"
                                        autoComplete="family-name"
                                        onChange={(e) => { setLastName(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email Address"
                                        name="email"
                                        autoComplete="email"
                                        onChange={(e) => { setEmail(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="mobile"
                                        label="Mobile No"
                                        name="Mobile No"
                                        autoComplete="Mobile No"
                                        onChange={(e) => { setMobileNo(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        autoComplete="new-password"
                                        onChange={(e) => { setPassword(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        id="confirm-password"
                                        autoComplete="confirm-password"
                                        error={passwordMatching}
                                        color={passwordMatching ? "primary" : "success"}
                                        onChange={(e) => {
                                            if (password !== e.target.value)
                                                setPasswordMatching(true)
                                            else
                                                setPasswordMatching(false)
                                        }}
                                        onFocus={(e) => {
                                            if (password !== e.target.value)
                                                setPasswordMatching(true)
                                            else
                                                setPasswordMatching(false)
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                                        label="I want to receive inspiration, marketing promotions and updates via email."
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign Up
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="/signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    {/* <Copyright sx={{ mt: 5 }} /> */}
                </Container>
            </ThemeProvider>
        </>
    );
}