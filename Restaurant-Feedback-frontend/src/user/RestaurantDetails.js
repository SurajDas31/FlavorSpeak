import { Button, Form, Modal, ProgressBar } from "react-bootstrap";
import { REST_URL, getAccessToken } from "../util/AuthUtil";
import "./RestaurantDetails.css"
import { useState } from "react";


const RestaurantDetails = (props) => {

    const [star, setStar] = useState(0);

    const [apiResult, setApiResult] = useState([]);

    const [reviewComment, setReviewComment] = useState("");

    const [rating, setRating] = useState({
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    })


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
                console.log(apiResult);

                for (const index in resultData) {
                    const element = resultData[index];

                    if (element.rating === "5") {
                        setRating((oldRating) => ({ ...oldRating, five: oldRating.five + 1 }))
                    } else if (element.rating === "4") {
                        setRating((oldRating) => ({ ...oldRating, four: oldRating.four + 1 }))
                    } else if (element.rating === "3") {
                        setRating((oldRating) => ({ ...oldRating, three: oldRating.three + 1 }))
                    } else if (element.rating === "2") {
                        setRating((oldRating) => ({ ...oldRating, two: oldRating.two + 1 }))
                    } else if (element.rating === "1") {
                        setRating((oldRating) => ({ ...oldRating, one: oldRating.one + 1 }))
                    }

                }

            }
        } catch (error) {
            console.error(error);
        }
    }

    const postReview = async () => {
        try {
            var res = await fetch(REST_URL + "/api/v1/restaurant/review/save", {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken(),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    restaurantId: props.restaurant.id,
                    reviewComment: reviewComment,
                    rating: star
                })
            })
            if (res.status === 200) {
                document.getElementById("star5").checked = false;
                document.getElementById("star4").checked = false;
                document.getElementById("star3").checked = false;
                document.getElementById("star2").checked = false;
                document.getElementById("star1").checked = false;
                
                setStar(0);
                setReviewComment("");
                loadData();
                console.log("hua");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const ReviewValidation = (value) => {
        setStar(value);
        document.getElementById("postReview").disabled = false;
    }

    const formatDate = (value) => {
        value = value * 1000;
        let date = new Date(value);
        console.log();
        let currentDate = new Date();

        let year = currentDate.getFullYear() - date.getFullYear();
        let result = year + "y";
        if (year < 1) {
            let day = currentDate.getDay() - date.getDay();
            result = day + "d";
            if (day < 1) {
                let hours = currentDate.getHours() - date.getHours()
                result = hours + "h";
                if (hours < 1) {
                    let minutes = currentDate.getMinutes() - date.getMinutes();
                    result = minutes + "m";
                }
            }
        }
        return result;
    }

    const printRating = (value) => {
        let result = "";
        for (let i = 0; i < value; i++) {
            result += "★";
        }
        return result;
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
                onExited={() => setRating({ one: 0, two: 0, three: 0, four: 0, five: 0 })}
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
                    <div className="rating-section">
                        <div className="progress-bar-section">
                            <div><p>5</p><ProgressBar variant="warning" now={rating.five * 100 / apiResult.length} label={rating.five} /></div>
                            <div><p>4</p><ProgressBar variant="warning" now={rating.four * 100 / apiResult.length} label={rating.four} /></div>
                            <div><p>3</p><ProgressBar variant="warning" now={rating.three * 100 / apiResult.length} label={rating.three} /></div>
                            <div><p>2</p><ProgressBar variant="warning" now={rating.two * 100 / apiResult.length} label={rating.two} /></div>
                            <div><p>1</p><ProgressBar variant="warning" now={rating.one * 100 / apiResult.length} label={rating.one} /></div>
                        </div>
                        <div className="average-rating-section">
                            <h5>{(Number.parseFloat((5 * rating.five + 4 * rating.four + 3 * rating.three + 2 * rating.two + 1 * rating.one) / apiResult.length).toFixed(1))}

                            </h5>
                            <p>{apiResult.length} reviews</p>
                        </div>

                    </div>

                    <hr></hr>
                    <Modal.Body scrollable="true">
                        <h4>Reviews</h4>
                        <div className="review-section" >
                            {apiResult.map(r => {
                                return (
                                    <ul key={r.id} className="review-ul">
                                        <li>
                                            <span id="profile-name">{r.person.firstName} {r.person.lastName}</span>
                                            <span id="review-time">{formatDate(r.lastModifiedDate)}</span>
                                            <span id="user-rating"><span id="star">{printRating(r.rating)}</span></span>
                                        </li>
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
                        value={reviewComment}
                        onChange={(e) => { setReviewComment(e.target.value) }}
                    />
                    <div className="rate" >
                        <input type="radio" id="star5" name="rate" value={star} onClick={(e) => ReviewValidation(5)} />
                        <label htmlFor="star5" title="text">5 stars</label>
                        <input type="radio" id="star4" name="rate" value={star} onClick={(e) => ReviewValidation(4)} />
                        <label htmlFor="star4" title="text">4 stars</label>
                        <input type="radio" id="star3" name="rate" value={star} onClick={(e) => ReviewValidation(3)} />
                        <label htmlFor="star3" title="text">3 stars</label>
                        <input type="radio" id="star2" name="rate" value={star} onClick={(e) => ReviewValidation(2)} />
                        <label htmlFor="star2" title="text">2 stars</label>
                        <input type="radio" id="star1" name="rate" value={star} onClick={(e) => ReviewValidation(1)} />
                        <label htmlFor="star1" title="text">1 star</label>
                    </div>
                    <Button id="postReview" onClick={postReview} disabled={star === 0 ? true : false}>Post Review</Button>

                </Modal.Footer>
            </Modal>
        </>
    );
}

export default RestaurantDetails;