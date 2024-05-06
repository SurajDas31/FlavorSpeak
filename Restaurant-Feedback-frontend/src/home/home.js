import { Carousel, Image } from "react-bootstrap";
import HomeNavbar from "../navbar/Navbar";
import Img1 from "./img/Home-splash-1.jpg"
import Img2 from "./img/Home-splash-2.jpg"
import Img3 from "./img/Home-splash-3.jpg"
import "./home.js"
import { Box, Paper, Stack } from "@mui/material";

const home = () => {

    return (
        <>
            <HomeNavbar />
            {/* <Carousel interval={5000}>
                <Carousel.Item>
                    <Image src={Img1} xs={3} md={2} alt="First slide" fluid />
                    <Carousel.Caption className="caption">
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={Img2} xs={3} md={2} fluid />
                    <Carousel.Caption className="caption">
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <Image src={Img3} xs={3} md={2} fluid />
                    <Carousel.Caption className="caption">
                        <h3>Third slide label</h3>
                        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> */}
            <Box
                sx={{
                    display: 'flex',
                    position: 'absolute',
                    top: '64px',
                    '& > :not(style)': {
                        m: 1,
                        width: 128,
                        height: 128,
                    },
                }}
            >
                <Paper elevation={1} />

                <Paper elevation={3} />
            </Box>
        </>
    );

}

export default home;