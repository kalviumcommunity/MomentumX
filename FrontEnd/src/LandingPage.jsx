import { Box, Button, Flex } from "@chakra-ui/react";
import "./App.css";
import "./LandingPage.css";
import Aos  from "aos";
import "aos/dist/aos.css"
import { useEffect } from "react";

function LandingPage() {
    useEffect(()=>{
        Aos.init({
            // Global settings:
            disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
            startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
            initClassName: 'aos-init', // class applied after initialization
            animatedClassName: 'aos-animate', // class applied on animation
            useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
            disableMutationObserver: false, // disables automatic mutations' detections (advanced)
            debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
            throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
            
          
            // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
            offset: 120, // offset (in px) from the original trigger point
            delay: 0, // values from 0 to 3000, with step 50ms
            duration: 400, // values from 0 to 3000, with step 50ms
            easing: 'ease', // default easing for AOS animations
            once: false, // whether animation should happen only once - while scrolling down
            mirror: false, // whether elements should animate out while scrolling past them
            anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
          
          });
    },[])
    return (
        <>
            <Box
                w="100vw"
                h="64px"
                bgColor="#121212"
                position="fixed"
                top="0px"
                boxShadow="4px 6px 6px rgba(0, 0, 0, 0.4)"
            >
                <Flex
                    w="100%-160px"
                    h="100%"
                    marginX="72px"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <img
                        src="./assets/MomentumXLogo.jpeg"
                        alt="MomentumX"
                        height="62px"
                        width="174px"
                    />
                    <Flex justifyContent="space-between" width="182px">
                        <Button
                            h="30px"
                            w="82px"
                            bgColor="#121212"
                            color="white"
                            textAlign="center"
                            borderRadius="2px"
                            className="small-regular"
                        >
                            Login
                        </Button>
                        <Button
                            h="30px"
                            w="82px"
                            bgColor="white"
                            color="#121212"
                            textAlign="center"
                            borderRadius="2px"
                            className="small-bold"
                        >
                            Register
                        </Button>
                    </Flex>
                </Flex>
            </Box>
            <div id="container">
                <section className="section">
                    <Flex
                        flexDirection="row"
                        width="calc(100% - 144px)"
                        height="100%"
                    >
                        <Flex
                            flexDirection="column"
                            width="52%"
                            height="100%"
                            justifyContent="center"
                        >
                            <div
                                className="title-bold"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Enabling growth through personalized progress
                                tracking
                            </div>
                            <div
                                className="description-regular"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                data-aos-delay="100"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Our vision is to create a culture of continuous
                                growth and improvement, where individuals and
                                teams can set ambitious goals and track their
                                progress with effective and personalized
                                solutions that provide actionable insights and
                                drive positive outcomes.
                            </div>
                            <Button
                                w="162px"
                                h="50px"
                                borderRadius="2px"
                                backgroundColor="#D5D5D5"
                                data-aos="zoom-in"
                                data-aos-duration="800"
                                data-aos-delay="500"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            ></Button>
                        </Flex>
                        <Flex
                            flexDirection="column"
                            width="48%"
                            height="100%"
                        ></Flex>
                    </Flex>
                </section>
                <section className="section">
                    <Flex
                        flexDirection="row"
                        width="calc(100% - 144px)"
                        height="100%"
                    >
                        <Flex
                            flexDirection="column"
                            width="48%"
                            height="100%"
                        ></Flex>
                        <Flex
                            flexDirection="column"
                            width="52%"
                            height="100%"
                            justifyContent="center"
                        >
                            <div
                                className="title-bold"
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Bye - Bye, Spreadsheets
                            </div>
                            <div
                                className="description-regular"
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-delay="100"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Keep every detail of a project centralized in
                                real time so up-to-date info can flow freely
                                across people and teams.
                            </div>
                        </Flex>
                    </Flex>
                </section>
                <section className="section" id="three">
                    <Flex
                        flexDirection="row"
                        width="calc(100% - 144px)"
                        height="100%"
                    >
                        <Flex
                            flexDirection="column"
                            width="52%"
                            height="100%"
                            justifyContent="center"
                        >
                            <div
                                className="title-bold"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Customize how your team's work flows
                            </div>
                            <div
                                className="description-regular"
                                data-aos="fade-right"
                                data-aos-duration="1000"
                                data-aos-delay="100"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Set up, clean up, and automate even the most
                                complicated project workflows.
                            </div>
                        </Flex>
                        <Flex
                            flexDirection="column"
                            width="48%"
                            height="100%"
                        ></Flex>
                    </Flex>
                </section>
                <section className="section" id="four">
                    <Flex
                        flexDirection="row"
                        width="calc(100% - 144px)"
                        height="100%"
                    >
                        <Flex
                            flexDirection="column"
                            width="48%"
                            height="100%"
                        ></Flex>
                        <Flex
                            flexDirection="column"
                            width="52%"
                            height="100%"
                            justifyContent="center"
                        >
                            <div
                                className="title-bold"
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Get useful insights of your members{" "}
                            </div>
                            <div
                                className="description-regular"
                                data-aos="fade-left"
                                data-aos-duration="1000"
                                data-aos-delay="100"
                                data-aos-once="false"
                                data-aos-mirror="true"
                            >
                                Insights gained from members data provide
                                valuable information that can guide
                                decision-making, improve performance, and drive
                                positive outcomes.
                            </div>
                        </Flex>
                    </Flex>
                </section>
            </div>
        </>
    );
}

export default LandingPage;
