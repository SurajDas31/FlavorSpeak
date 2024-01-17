import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { REST_URL, getAccessToken, getUserId } from "../../util/AuthUtil";

const AddRestaurant = (props) => {

    const [userData, setUserData] = useState({});

    

    const saveRestaurantData = async (event) => {
        event.preventDefault();
      
        try {
            var res = await fetch(REST_URL + "/api/v1/user/update" , {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken(),
                    "Content-Type": "application/json" 
                },
                body: JSON.stringify(userData)
            })
            if (res.status === 200) {
                let data = await res.json();
               
            }
        } catch (error) {
            console.error(error);
        }
        console.log(userData);
    }

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
                        Add a Restaurant
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={saveRestaurantData}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Restaurant Name</Form.Label>
                            <Form.Control type="text" placeholder="Name" value={userData.firstName} onChange={(e) => { setUserData((old) => ({ ...old, firstName: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" value={userData.lastName} onChange={(e) => { setUserData((old) => ({ ...old, lastName: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" value={userData.email} onChange={(e) => { setUserData((old) => ({ ...old, email: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control type="text" placeholder="Owner name" />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Max 200 character" value={userData.mobileNo} onChange={(e) => { setUserData((old) => ({ ...old, mobileNo: e.target.value })) }} />
                        </Form.Group>

                        <Button variant="primary" type="submit">Submit</Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddRestaurant;