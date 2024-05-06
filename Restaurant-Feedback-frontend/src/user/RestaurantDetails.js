
import { Avatar, Box, Button, FormControl, LinearProgress, Modal, TextField } from "@mui/material";

import { REST_URL, getAccessToken } from "../util/AuthUtil";
import "./RestaurantDetails.css"
import { useEffect, useState } from "react";


const RestaurantDetails = (props) => {

    const [star, setStar] = useState(0);

    const [apiResult, setApiResult] = useState([]);

    const [reviewComment, setReviewComment] = useState("");

    useEffect(() => {

        if (props.show === true) {
            loadData();
        } else if (props.show === false) {
            setRating({ one: 0, two: 0, three: 0, four: 0, five: 0 })
        }

    }, [props.show])

    const [rating, setRating] = useState({
        one: 0,
        two: 0,
        three: 0,
        four: 0,
        five: 0
    })

    const boxStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        border: '0px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };



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

                setRating({ one: 0, two: 0, three: 0, four: 0, five: 0 })
                loadData();
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
            <Modal keepMounted
                open={props.show}
                onClose={() => {
                    setRating({ one: 0, two: 0, three: 0, four: 0, five: 0 })
                    { props.onHide() }
                }}

            >
                <Box sx={{ ...boxStyle }}>
                    <h2 id="parent-modal-title"> {props.restaurant.name}</h2>
                    <p id="parent-modal-description">
                        {props.restaurant.description}
                    </p>

                    <div className="rating-section">
                        <div className="progress-bar-section">
                            <div><p>5</p><LinearProgress variant="determinate" value={rating.five * 100 / apiResult.length} /></div>
                            <div><p>4</p><LinearProgress variant="determinate" value={rating.four * 100 / apiResult.length} /></div>
                            <div><p>3</p><LinearProgress variant="determinate" value={rating.three * 100 / apiResult.length} /></div>
                            <div><p>2</p><LinearProgress variant="determinate" value={rating.two * 100 / apiResult.length} /></div>
                            <div><p>1</p><LinearProgress variant="determinate" value={rating.one * 100 / apiResult.length} /></div>
                        </div>
                        <div className="average-rating-section">
                            <h5>
                                {(Number.parseFloat((5 * rating.five + 4 * rating.four + 3 * rating.three + 2 * rating.two + 1 * rating.one) / apiResult.length).toFixed(1))}
                            </h5>
                            <p>{apiResult.length} reviews</p>
                        </div>

                    </div>

                    <Box>
                        <h4>Reviews</h4>
                        <Box className="review-section" sx={{ height: 200, overflow: 'auto' }}>
                            {apiResult.map(r => {
                                return (
                                    <ul key={r.id} className="review-ul">
                                        <li>
                                            <Avatar alt={r.person.firstName + r.person.lastName} src={REST_URL + "/api/v1/user/get/profile-picture/" + r.person.id} />
                                            <span id="profile-name">{r.person.firstName} {r.person.lastName}</span>
                                            <span id="review-time">{formatDate(r.lastModifiedDate)}</span>
                                            <span id="user-rating"><span id="star">{printRating(r.rating)}</span></span>
                                        </li>
                                        <li>{r.reviews}</li>
                                    </ul>)
                            })}
                        </Box>
                    </Box>

                    <FormControl sx={{ width: '100%' }}>
                        <TextField
                            multiline
                            rows={3}
                            value={reviewComment}
                            onChange={(e) => { setReviewComment(e.target.value) }}
                        />
                    </FormControl>

                    <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
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
                        <Button id="postReview" variant="contained" onClick={postReview} disabled={star === 0 ? true : false}>Post Review</Button>

                    </Box>

                </Box>
            </Modal>
        </>
    );
}

export default RestaurantDetails;