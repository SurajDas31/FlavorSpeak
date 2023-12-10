import { Card, CardGroup, Col, Container, Row } from "react-bootstrap";
import img1 from "../home/img/Home-splash-1.jpg"
import img2 from "../home/img/Home-splash-2.jpg"
import img3 from "../home/img/Home-splash-3.jpg"
import HomeNavbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import { REST_URL, getAccessToken, isLoggedIn } from "../util/AuthUtil";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate()

    const [restaurant, setRestaurant] = useState([])

    useEffect(() => {
        console.log("UseEffect Dashboard")
        if (!isLoggedIn()) {
            navigate("/")
        }
        loadRestaurantData();
    }, [])

    let loadRestaurantData = async () => {
        try {
            var res = await fetch(REST_URL + "/api/v1/restaurant/getAll", {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + getAccessToken()
                }
            })
            if (res.status === 200) {
                let data = await res.json()
                setRestaurant(data)
                console.log(restaurant);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <HomeNavbar />
            <Container className="mt-5" style={{ height: '100vh' }}>
                <Row xs={1} md={3} className="g-4">
                    {
                        restaurant.map(r => {
                            return (
                                <Col >
                                    <Card className="restaurant-card">
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
            </Container>
        </>
    );
}

export default Dashboard;