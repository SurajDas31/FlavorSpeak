import { Button, Form, Modal, ModalBody, ProgressBar } from "react-bootstrap";
import { REST_URL, getAccessToken } from "../util/AuthUtil";
import "./RestaurantDetails.css"

import "./RestaurantDetails.css"
import { useState } from "react";
import userEvent from "@testing-library/user-event";

const RestaurantDetails = (props) => {

    const [star, setStar] = useState(0);

    const [apiResult, setApiResult] = useState([]);

    const [oneRating, setOneRating] = useState(0);
    const [twoRating, setTwoRating] = useState(0);
    const [threeRating, setThreeRating] = useState(0);
    const [fourRating, setFourRating] = useState(0);
    const [fiveRating, setFiveRating] = useState(0);

    let loadData = async () => {
        try {
            var res = await fetch(REST_URL + "/api/v1/restaurant/review/get/" + props.restaurant.id, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken()
                }
            })
            if (res.status === 200) {
                let resultData = await res.json()
                setApiResult(resultData)

                for (const index in resultData) {
                    const element = resultData[index];

                    if (element.rating === "5") {
                        setFiveRating(fiveRating + 1)
                    } else if (element.rating === "4") {
                        setFourRating(fourRating + 1)
                    } else if (element.rating === "3") {
                        setThreeRating(threeRating + 1)
                    } else if (element.rating === "2") {
                        setTwoRating(twoRating + 1)
                    } else if (element.rating === "1") {
                        setOneRating(oneRating + 1)
                    }

                }

            }
        } catch (error) {
            console.error(error);
        }
    }

    const ReviewValidation = (value) => {
        setStar(value);
        document.getElementById("postReview").disabled = false;
    }

    return (
        <>
            <Modal show={props.show}
                {...props}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                dialogClassName="modal-90h"
                centered
                onShow={() => loadData()}
                onExit={() => { setFiveRating(0); setFourRating(0); setThreeRating(0); setTwoRating(0); setOneRating(0) }}
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.restaurant.name}
                    </Modal.Title>
                    <h5>
                        {props.restaurant.city}, {props.restaurant.state}
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {props.restaurant.description}
                    </p>
                    <hr></hr>
                    <div>
                        <div className="progress-bar-section">
                            <div><p>5</p><ProgressBar variant="warning" now={fiveRating * 100 / apiResult.length} label={fiveRating} /></div>
                            <div><p>4</p><ProgressBar variant="warning" now={fourRating * 100 / apiResult.length} label={fourRating} /></div>
                            <div><p>3</p><ProgressBar variant="warning" now={threeRating * 100 / apiResult.length} label={threeRating} /></div>
                            <div><p>2</p><ProgressBar variant="warning" now={twoRating * 100 / apiResult.length} label={twoRating} /></div>
                            <div><p>1</p><ProgressBar variant="warning" now={oneRating * 100 / apiResult.length} label={oneRating} /></div>
                        </div>
                        <div className="average-rating-section">
                            {Number.parseFloat((5 * fiveRating + 4 * fourRating + 3 * threeRating + 2 * twoRating + 1 * oneRating) / apiResult.length).toFixed(1)}
                        </div>

                    </div>

                    <hr></hr>
                    <Modal.Body scrollable="true">
                        <h4>Reviews</h4>
                        <div className="review-section" >
                            {apiResult.map(r => {
                                return (
                                    <ul key={r.id} className="review-ul">
                                        <li><span id="profile-name">{r.person.firstName} {r.person.lastName}</span><span id="user-rating">{r.rating}★ </span></li>
                                        <li>{r.reviews}</li>
                                    </ul>)
                            })}
                        </div>
                    </Modal.Body>
                </Modal.Body>
                <Modal.Footer>
                    <Form.Control
                        as="textarea"
                        placeholder="Leave your review here"
                        style={{ height: '100px' }}
                    />
                    <div className="rate" >
                        <input type="radio" id="star5" name="rate" value="5" onClick={(e) => ReviewValidation(e.target.value)} />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value="4" onClick={(e) => ReviewValidation(e.target.value)} />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value="3" onClick={(e) => ReviewValidation(e.target.value)} />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value="2" onClick={(e) => ReviewValidation(e.target.value)} />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value="1" onClick={(e) => ReviewValidation(e.target.value)} />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                    <Button id="postReview" disabled>Post Review</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RestaurantDetails;