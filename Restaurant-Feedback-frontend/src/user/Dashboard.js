import { Card, Col, Container, Row } from "react-bootstrap";
import img1 from "../home/img/Home-splash-1.jpg"

import HomeNavbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import { REST_URL, getAccessToken, isLoggedIn } from "../util/AuthUtil";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"
import RestaurantDetails from "./RestaurantDetails";

const Dashboard = () => {
    const navigate = useNavigate()

    const [modalToggle, setModalToggle] = useState(false)
    const [restaurantList, setRestaurantList] = useState([])
    const [restaurant, setRestaurant] = useState({})

    useEffect(() => {
        isLoggedIn().then(res => {
            if (!res)
                navigate("/")
            }
        );

        loadRestaurantData();
    }, [])

    let loadRestaurantData = async () => {
        try {
            var res = await fetch(REST_URL + "/api/v1/restaurant/get", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken()
                }
            })
            if (res.status === 200) {
                let data = await res.json()
                setRestaurantList(data)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <HomeNavbar />
            <Container className="mt-5">
                <Row xs={2} md={3} lg={4} className="g-4">
                    {
                        restaurantList.map((r) => {
                            return (
                                <Col key={r.id}>
                                    <Card className="restaurant-card" onClick={() => { setModalToggle(true); setRestaurant(r) }}>
                                        <Card.Img variant="top" src={img1} />
                                        <Card.Body>
                                            <Card.Title>{r.name}</Card.Title>
                                            <Card.Text>
                                                {r.description}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            {r.city}, {r.state}
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            );
                        })
                    }

                </Row>
                <RestaurantDetails show={modalToggle} onHide={() => setModalToggle(false)} restaurant={restaurant} />
            </Container >
        </>
    );
}

export default Dashboard;