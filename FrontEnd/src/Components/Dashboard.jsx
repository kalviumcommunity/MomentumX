import { Box, Flex, Image } from "@chakra-ui/react";
import ProjectsList from "./Services/ProjectsList";
import UserProfile from "./UserProfile";

function Dashboard() {
      
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
                <ProjectsList/>
                <UserProfile />
            </Flex>
        </>
    ); 
    
}

export default Dashboard