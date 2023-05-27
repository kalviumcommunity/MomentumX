import { Flex, Text } from "@chakra-ui/react";
import Puzzle from '@mui/icons-material/Extension';
import { useEffect } from "react";

function ProjectsList({projects, setProjectName}) {

  useEffect(() => {
    if (projects) {
      setProjectName(projects[0]);
    }
  }, [projects]);

  const handleProjectClick = (projectName) => {
    setProjectName(projectName);
  };

  return (
    <Flex
      flexDir="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      overflowY="scroll"
      width="calc(100%)"
      height="calc(100% - 140px)"
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {projects.length > 0 ? (
        projects.map((item, index) => (
          <Flex
            key={index}
            sx={{
              "&:hover": {
                cursor: "pointer",
                bgColor: "#242424",
              }
            }}
            alignItems="center"
            width="100%"
            minHeight="60px"
            onClick={() => handleProjectClick(item)}
          >
            <Puzzle
              sx={{
                color: "#C8C8C8",
                fontSize: "26px",
                marginLeft: "32px",
              }}
            />
            <Text
              className="sub-heading"
              marginLeft="24px"
              fontWeight="bold"
              color="#C8C8C8"
              key={index}
            >
              {item}
            </Text>
          </Flex>
        ))
      ) : (
        <Text>Loading...</Text>
      )}
    </Flex>
  );
}

export default ProjectsList