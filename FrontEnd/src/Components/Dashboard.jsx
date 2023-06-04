import { Box, Flex, Image } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Board from "./Kanban/Board";
import UserProfile from "./UserProfile";
import ProjectsList from "./Services/ProjectsList";

function Dashboard() {
    const [userEmail, setUserEmail] = useState();
    const [userName, setUserName] = useState();
    const [projectsList, setProjectsList] = useState([]);
    const [projectName, setProjectName] = useState("Loading...");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `/users/${userEmail}/${userName}`
                );
                if (!response.ok) {
                    throw new Error("Error fetching user data");
                }
                const data = await response.json();
                setProjectsList(data.projectsList);
            } catch (error) {
                console.error(error);
            }
        };
        if (userEmail && userName) {
            fetchUserData();
        }
    }, [userEmail, userName]);

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
                {projectsList && (
                    <ProjectsList
                        setProjectName={setProjectName}
                        projectsList={projectsList}
                    />
                )}
                <UserProfile
                    setUserEmail={setUserEmail}
                    setUserName={setUserName}
                />
            </Flex>
            <Box
                height="100vh"
                width="calc(100vw - 340px)"
                position="fixed"
                top="0px"
                right="0px"
            >
                <Board projectName={projectName} userEmail={userEmail} />
            </Box>
        </>
    );
}

export default Dashboard;
