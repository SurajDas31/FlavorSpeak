import HomeNavbar from "../navbar/Navbar";

import { Box, Paper } from "@mui/material";
import img from "../home/img/Home-splash-4.jpg"
import { useState } from "react";
import Typewriter from "typewriter-effect";

const Home = () => {

    const [typedText, setTypedText] = useState('');


    const typeWriter2 = () => {
        console.log("TypeWriter");

        // set up text to print, each item in array is new line
        var aText = new Array(
            "Empowering Taste, Empowering Feedback: Your Voice Shapes All Kitchen"
        );
        var iSpeed = 100; // time delay of print out
        var iIndex = 0; // start printing array at this posision
        var iArrLength = aText[0].length; // the length of the text array
        var iScrollAt = 20; // start scrolling up at this many lines

        var iTextPos = 0; // initialise text position
        var sContents = ''; // initialise contents variable
        var iRow; // initialise current row


        sContents = ' ';
        iRow = Math.max(0, iIndex - iScrollAt);

        while (iRow < iIndex) {
            sContents += aText[iRow++] + '<br />';
        }
        setTypedText(sContents + aText[iIndex].substring(0, iTextPos) + "_");
        if (iTextPos++ === iArrLength) {
            iTextPos = 0;
            iIndex++;
            if (iIndex !== aText.length) {
                iArrLength = aText[iIndex].length;
                // setTimeout("typeWriter()", 500);
            }
        } else {
            // setTimeout("typeWriter()", iSpeed);
        }
    }


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
            <Box component="" sx={{
                height: '100vh',
                p: 2, border: '1px dashed grey', display: 'flex', justifyContent: 'center', backgroundImage: `url(${img})`, backgroundSize: '100% 100%',
                '& > :not(style)': {
                    m: 1,
                    width: 500,
                    height: 250,
                }
            }}>
                <Paper elevation={0} sx={{ top: '45%', position: "relative", fontFamily: "cursive", letterSpacing: ".10em", fontSize: "2em", fontWeight: '600', color: "white", backgroundColor: "#00000061", }}>
                    <Typewriter
                        options={{
                            strings: ['Empowering Taste, Empowering Feedback: Your Voice Shapes All Kitchen', 'Transforming Feedback into Flavorful Insights: Your Recipe for Success!', 'Where Taste Meets Insight: Crafting Excellence One Byte at a Time!'],
                            autoStart: true,
                            delay: 50,
                            loop: true
                        }}
                    />
                </Paper>
            </Box >
        </>
    );

}

export default Home;