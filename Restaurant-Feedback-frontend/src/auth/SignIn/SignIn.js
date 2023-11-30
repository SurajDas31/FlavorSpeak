import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import "./SignIn.css";
import { Link } from "react-router-dom";
import { REST_URL, login } from "../../util/AuthUtil";

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                console.log(data.accessToken);
                login(data.accessToken, data.refreshToken, data.person.firstName + " " + data.person.lastName);
                window.location.href = "/auth/dashboard"
            }
        } catch (error) {
            console.error(error);
        }

    }


    return (
        <>
            <Container fluid>
                <Row>
                    <Col sm={8} style={{ padding: 0 + 'px' }}>
                        <div className="left-bg"></div>
                    </Col>
                    <Col sm={4} className="SignInLayout">
                        <Container>
                            <Form onSubmit={loginHandler}>
                                <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                    <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                </FloatingLabel>
                                <div className="SignFormBottomBar">
                                    <Button type="submit" variant="primary">Sign In</Button>
                                    <Link to="/signup">Already have an account?</Link>
                                </div>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );

}

