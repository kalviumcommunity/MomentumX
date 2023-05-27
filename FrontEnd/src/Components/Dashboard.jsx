import { Box, Flex, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import mockData from './Services/mock.json'
import Board from "./Kanban/Board";
import UserProfile from "./UserProfile";
import ProjectsList from "./Services/ProjectsList";

function Dashboard() {

    const [userEmail, setUserEmail] = useState()
    const [projects, setProjects] = useState([]);
    const [projectName, setProjectName] = useState("Loading...")

    useEffect(() => {
        if (userEmail) {
            setProjects(mockData[userEmail]?.projects || []);

        }
    }, [userEmail]);
      
    return (
        <>
            <Box
                bgColor="#121212"
                height="100vh"
                width="340px"
                position="fixed"
                left="0px"
                top="0px"
                zIndex="-1"
            ></Box>
            <Flex
                height="calc(100vh - 50px)"
                width="340px"
                flexDir="column"
                justifyContent="space-between"
                alignItems="flex-start"
                margin="10px 0px 40px 0px"
            >
                <Image
                    src="./assets/MomentumXLogo.jpeg"
                    alt="MomentumX"
                    height="72px"
                    width="194px"
                    marginLeft="32px"
                />
                {userEmail && <ProjectsList setProjectName={setProjectName} projects={projects} />}
                <UserProfile setUserEmail={setUserEmail} />
            </Flex>
            <Box height="100vh" width="calc(100vw - 340px)" position="fixed" top="0px" right="0px" >
                <Board projectName= {projectName}/>
            </Box>
        </>
    ); 
    
}

export default Dashboard