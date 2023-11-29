import { useState } from "react";
import { Button, Container, FloatingLabel, Form, Row, Col } from "react-bootstrap";
import "./SignIn.css";
import { Link } from "react-router-dom";

export default function SignIn() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
                                    <Button onClick={loginHandler} variant="primary">Sign In</Button>
                                    <Link to="/signup">Already have an account?</Link>
                                </div>
                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
    function loginHandler(event) {
        event.preventDefault();

        var jsonData = JSON.stringify({
            email: email,
            password: password,
        })
        console.log(jsonData);
    }
}

