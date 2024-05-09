import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { REST_URL, getAccessToken, getUserId } from "../../util/AuthUtil";
import { Avatar, IconButton } from "@mui/material";
import { displayProtectedProfileImage } from "../../util/Util";

const Settings = (props) => {

    const [userData, setUserData] = useState({});

    const [profilePic, setProfilePic] = useState(null);

    let loadData = async () => {
        try {
            var res = await fetch(REST_URL + "/api/v1/user/get/" + getUserId(), {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken()
                }
            })
            if (res.status === 200) {
                let data = await res.json();
                setUserData(data);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const saveSettings = async (event) => {
        event.preventDefault();

        try {
            var res = await fetch(REST_URL + "/api/v1/user/update", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            if (res.status === 200) {

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
                onShow={() => {
                    loadData()
                    displayProtectedProfileImage().then(res =>
                        setProfilePic(res)
                    )
                }}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Profile
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <input
                        accept="image/*"
                        id="contained-button-file"
                        multiple
                        type="file"
                        hidden
                    />
                    <label htmlFor="contained-button-file">
                        <IconButton>
                            <Avatar
                                src={`${profilePic}`}
                                style={{
                                    margin: "10px",
                                    width: "60px",
                                    height: "60px",
                                }}
                            />
                        </IconButton>
                    </label>

                    <Form onSubmit={saveSettings}>
                        <Form.Group className="mb-3" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter first name" value={userData.firstName} onChange={(e) => { setUserData((old) => ({ ...old, firstName: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter last name" value={userData.lastName} onChange={(e) => { setUserData((old) => ({ ...old, lastName: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" value={userData.email} disabled onChange={(e) => { setUserData((old) => ({ ...old, email: e.target.value })) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="********" disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" >
                            <Form.Label>Mobile No</Form.Label>
                            <Form.Control type="text" placeholder="Mobile No" value={userData.mobileNo} onChange={(e) => { setUserData((old) => ({ ...old, mobileNo: e.target.value })) }} />
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

export default Settings;