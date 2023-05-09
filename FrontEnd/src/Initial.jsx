import {Routes, Route} from "react-router-dom"
import LandingPage from "./LandingPage"
import LoginPage from "./LoginPage"
import SignupPage from "./SignupPage"
import { Box } from "@chakra-ui/react"



function Initial() {

    return (
        <>
            <Box bgImg="url('./assets/BG.jpg')" bgSize="cover" h="100vh" w="100vw" position="fixed" zIndex="-999" />
            <Box bgColor="black" h="100vh" w="100vw" opacity="40%" position="fixed" zIndex="-998" />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </>
    ); 
}

export default Initial