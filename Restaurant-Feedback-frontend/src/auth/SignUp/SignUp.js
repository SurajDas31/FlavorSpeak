import { Button, Col, Container, FloatingLabel, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SignUp.css"

export default function SignUp() {

    return (
        <>

            <Container fluid>
                <Row>
                    <Col sm={8} style={{ padding: 0 + 'px' }}>
                        <div className="left-bg"></div>
                    </Col>
                    <Col sm={4} className="SignUpLayout">
                        <Container>
                            <Form action="#">
                                <FloatingLabel controlId="floatingFirstName" label="First Name" className="mb-3">
                                    <Form.Control type="text" placeholder="John" id="firstName" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingLastName" label="Last Name" className="mb-3">
                                    <Form.Control type="text" placeholder="Doe" id="lastName" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingEmail" label="Email address" className="mb-3">
                                    <Form.Control type="email" placeholder="name@example.com" id="email" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                                    <Form.Control type="password" placeholder="Password" id="password" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3">
                                    <Form.Control type="password" placeholder="Confirm password" id="confirmPassword" />
                                </FloatingLabel>
                                <div className="SignFormBottomBar">
                                    <Button type="submit" variant="primary">Sign Up</Button>
                                    <Link to="/signin">Already have an account?</Link>
                                </div>

                            </Form>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
}