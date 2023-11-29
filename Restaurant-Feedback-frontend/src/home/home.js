import { Carousel, Image } from "react-bootstrap";
import HomeNavbar from "../navbar/Navbar";
import Img1 from "./img/Home-splash-1.jpg"
import Img2 from "./img/Home-splash-2.jpg"
import Img3 from "./img/Home-splash-3.jpg"
import Img4 from "./img/Home-splash-4.jpg"

const home = () => {

    return (
        <>
            <HomeNavbar />

            <Carousel>
                <Carousel.Item>
                    <Image src={Img1} xs={3} md={2} fluid />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <Image src={Img2} xs={3} md={2} fluid />
                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                <Image src={Img3} xs={3} md={2} fluid />
                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    );

}

export default home;