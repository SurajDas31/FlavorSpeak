import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { REST_URL, getAccessToken } from "../../../util/AuthUtil";

import { ShowAlert } from "../../../util/AlertUtil";

const AddRestaurant = (props) => {

    const [restaurantData, setRestaurantData] = useState({});

    const [alertShow, setAlertShow] = useState(false);

    const closeAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlertShow(false);
    };

    const saveRestaurantData = async (event) => {
        event.preventDefault();

        try {
            var res = await fetch(REST_URL + "/api/v1/restaurant/save", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(restaurantData)
            })
            if (res.status === 200) {
                setAlertShow(true);
                props.onHide();

            }
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>

            <ShowAlert toggle={alertShow} handleClose={closeAlert} message={"Data has been saved successfully"} />
            <Modal show={props.show}
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90h"
                onExit={() => setRestaurantData({})}
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
                            <Form.Control type="text" placeholder="Name" value={restaurantData.name} onChange={(e) => { setRestaurantData((old) => ({ ...old, name: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" placeholder="City" value={restaurantData.city} onChange={(e) => { setRestaurantData((old) => ({ ...old, city: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>State</Form.Label>
                            <Form.Control type="text" placeholder="State" value={restaurantData.state} onChange={(e) => { setRestaurantData((old) => ({ ...old, state: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Owner Name</Form.Label>
                            <Form.Control type="text" placeholder="Owner name" value={restaurantData.ownerName} onChange={(e) => { setRestaurantData((old) => ({ ...old, ownerName: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile No.</Form.Label>
                            <Form.Control type="text" placeholder="Owner name" value={restaurantData.mobileNo} onChange={(e) => { setRestaurantData((old) => ({ ...old, mobileNo: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Max 200 character" maxLength={200} value={restaurantData.description} onChange={(e) => { setRestaurantData((old) => ({ ...old, description: e.target.value })) }} />
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