import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import mockData from './mock.json'
import Puzzle from '@mui/icons-material/Extension';

function ProjectsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(mockData);
  }, []);

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
          {data.length > 0 ? (
              data.map((item, index) => (
                  <Flex
                      sx={{
                          "&:hover": {
                              cursor: "pointer",
                              bgColor: "#242424",
                          },
                      }}
                      alignItems="center"
                      width="100%"
                      minHeight="60px"
                  >
                      <Puzzle
                          sx={{
                              color: "#C8C8C8",
                              fontSize: "26px",
                              marginLeft: "32px"                          }}
                      />
                      <Text
                          className="sub-heading"
                          marginLeft="24px"
                          fontWeight="bold"
                          color="#C8C8C8"
                          key={index}
                      >
                          {item.name}
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