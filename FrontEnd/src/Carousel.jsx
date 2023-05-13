import React from 'react';
import { Image, Box, Flex, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Navigation, Pagination, Autoplay, EffectFade } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/autoplay'
import 'swiper/css/effect-fade';
import './Carousel.css'
import './App.css'

const Carousel = () => {
  return (
      <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          slidesPerView={1}
          navigation
          effect="fade"
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          pagination={{
              clickable: true,
          }}
          loop={true}
      >
          <SwiperSlide>
              <Image
                  src="./assets/Insights.png"
                  alt="Insights"
                  height="560px"
                  borderRadius="28px 0px 0px 28px"
              />
              <Box
                  h="560px"
                  w="100%"
                  bgColor="black"
                  opacity="60%"
                  position="fixed"
                  top="0px"
                  left="0px"
                  borderRadius="28px 0px 0px 28px"
              ></Box>
              <Flex
                  flexDir="column"
                  alignItems="center"
                  justifyContent="flex-start"
                  marginBottom="40px"
                  h="120px"
                  w="100%"
                  position="fixed"
                  bottom="0px"
                  left="0px"
              >
                  <Text
                      className="heading"
                      fontWeight="semiBold"
                      color="#FFFFFF"
                      textAlign="center"
                      margin="0px 20px 8px 20px"
                  >
                      Get useful insights
                  </Text>
                  <Text
                      className="x-small"
                      fontWeight="normal"
                      color="#D7D7D7"
                      textAlign="center"
                      margin="0px 20px 8px 20px"
                  >
                      Insights gained from members data provide valuable
                      information that can guide decision-making, improve
                      performance, and drive positive outcomes.
                  </Text>
              </Flex>
          </SwiperSlide>
          <SwiperSlide>
              <Image
                  src="./assets/Workflow.png"
                  alt="Workflow"
                  height="560px"
                  borderRadius="28px 0px 0px 28px"
              />
              <Box
                  h="560px"
                  w="100%"
                  bgColor="black"
                  opacity="60%"
                  position="fixed"
                  top="0px"
                  left="0px"
                  borderRadius="28px 0px 0px 28px"
              ></Box>
              <Flex
                  flexDir="column"
                  alignItems="center"
                  justifyContent="flex-start"
                  marginBottom="40px"
                  h="120px"
                  w="100%"
                  position="fixed"
                  bottom="0px"
                  left="0px"
              >
                  <Text
                      className="heading"
                      fontWeight="semiBold"
                      color="#FFFFFF"
                      textAlign="center"
                      margin="0px 20px 8px 20px"
                  >
                      Customize how your team's work flows
                  </Text>
                  <Text
                      className="x-small"
                      fontWeight="normal"
                      color="#D7D7D7"
                      textAlign="center"
                      margin="0px 20px 8px 20px"
                  >
                      Set up, clean up, and automate even the most complicated
                      project workflows.
                  </Text>
              </Flex>
          </SwiperSlide>
          <SwiperSlide>
              <Image
                  src="./assets/Growth.png"
                  alt="Growth"
                  height="560px"
                  borderRadius="28px 0px 0px 28px"
              />
              <Box
                  h="560px"
                  w="100%"
                  bgColor="black"
                  opacity="50%"
                  position="fixed"
                  top="0px"
                  left="0px"
                  borderRadius="28px 0px 0px 28px"
              ></Box>
              <Flex
                  flexDir="column"
                  alignItems="center"
                  justifyContent="flex-start"
                  marginBottom="40px"
                  h="120px"
                  w="100%"
                  position="fixed"
                  bottom="0px"
                  left="0px"
              >
                  <Text
                      className="heading"
                      fontWeight="semiBold"
                      color="#FFFFFF"
                      textAlign="center"
                      margin="0px 20px 8px 20px"
                  >
                      Enabling growth
                  </Text>
                  <Text
                      className="x-small"
                      fontWeight="normal"
                      color="#D7D7D7"
                      textAlign="center"
                      margin="0px 20px 8px 20px"
                  >
                      Encouraging continuous growth and improvement, where
                      individuals and teams can set ambitious goals and track
                      their progress with effective and personalized solutions.
                  </Text>
              </Flex>
          </SwiperSlide>
      </Swiper>
  );
};

export default Carousel;
