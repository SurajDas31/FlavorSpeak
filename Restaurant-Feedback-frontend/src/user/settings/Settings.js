import { Button, Form, Modal, ProgressBar } from "react-bootstrap";

const Settings = (props) => {

    return (
        <>
            <Modal show={props.show}
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90h"
                centered

            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Settings
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" />  
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="email" placeholder="Email" />
                        </Form.Group>
                       
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Settings;