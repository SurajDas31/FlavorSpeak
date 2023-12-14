import { Form, Modal, ProgressBar } from "react-bootstrap";
import "./RestaurantDetails.css"

const RestaurantDetails = (props) => {

    return (
        <>
            {console.log(props)}
            <Modal show={props.show}
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90h"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.restaurant.name}
                    </Modal.Title>
                    <p>
                        {props.restaurant.city}, {props.restaurant.state}
                    </p>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {props.restaurant.description}
                    </p>

                    <div>
                        <ProgressBar variant="success" now={40} />
                        <ProgressBar variant="secondary" now={20} />
                        <ProgressBar variant="info" now={60} />
                        <ProgressBar variant="warning" now={80} />
                        <ProgressBar variant="danger" now={50} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div class="rate">
                        <input type="radio" id="star5" name="rate" value="5" />
                        <label for="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" />
                        <label for="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" />
                        <label for="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" />
                        <label for="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" />
                        <label for="star1" title="text">1 star</label>
                    </div>
                    <Form.Control
                        as="textarea"
                        placeholder="Leave a comment here"
                        style={{ height: '100px' }}
                    />
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RestaurantDetails;