
import img1 from "../home/img/Home-splash-1.jpg"

import HomeNavbar from "../navbar/Navbar";
import { useEffect, useState } from "react";
import { REST_URL, getAccessToken, isLoggedIn } from "../util/AuthUtil";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css"
import RestaurantDetails from "./RestaurantDetails";
import { Box, Card, CardActions, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
    }, [navigate])

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
            {/* <Container className="mt-5">
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
               
            </Container > */}
            <Box sx={{position: 'absolute', top: '64px'}}>
                <Grid container spacing={3} sx={{ mt: '1px', display: "flex", justifyContent: "center" }} >
                    {restaurantList.map((r) => {
                        return (
                            <Grid item key={r.id} >
                                <Card className="restaurant-card" sx={{ maxWidth: 345, minWidth: 345, maxHeight: 345, minHeight: 345 }} onClick={() => { setModalToggle(true); setRestaurant(r) }}>
                                    <CardMedia
                                        sx={{ height: 140 }}
                                        image={img1}
                                        title=""
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div" sx={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '1', WebkitBoxOrient: 'vertical' }}>
                                            {r.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ height: 80.06, overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '4', WebkitBoxOrient: 'vertical' }}>
                                            {r.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions sx={{ position: 'relative', bottom: '-15px', justifyContent: 'center' }}>
                                        <Typography variant="body1">
                                        <LocationOnIcon/>  {r.city}, {r.state}
                                        </Typography>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>

                <RestaurantDetails show={modalToggle} onHide={() => setModalToggle(false)} restaurant={restaurant} />
            </Box >
        </>
    );
}

export default Dashboard;