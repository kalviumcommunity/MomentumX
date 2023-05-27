import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, createTheme, ThemeProvider } from '@mui/material';
import LogoutButton from "./Logout";
import { Flex, Text, Box } from "@chakra-ui/react";


const UserProfile = ({setUserEmail}) => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (user && user.email) {
      setUserEmail(user.email); // Set user's email if it exists
    }
  }, [user, setUserEmail]);

  if (isLoading) {
    return <Box className="x-small" width="100%" color="#929292" textAlign="center">Loading ...</Box>;
  }

  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif"
    },
  });

  function getInitials(fullName) {
    const names = fullName.split(' ');
    const initials = names.map(name => name[0]).join('');
    return initials;
  }

  function getRandomLightColor() {
    return `hsl(${Math.random() * 360}, 100%, 80%)`;
  }
  
  const randomColor = getRandomLightColor();


  return (
      isAuthenticated && (
          <Box width="calc(100% - 32px)" margin="0px 16px">
              <Flex flexDirection="row" justifyContent="space-between" alignItems="center">
                  <Flex flexDirection="row" justifyContent="flex-start" alignItems="center">
                      <ThemeProvider theme={theme}>
                          {user.picture ? (
                              <Avatar
                                  sx={{
                                      height: "40px",
                                      width: "40px",
                                  }}
                                  imgProps={{ referrerPolicy: "no-referrer" }}
                                  src={user.picture}
                                  alt={user.name}
                              ></Avatar>
                          ) : (
                              <Avatar
                                  className="small"
                                  sx={{
                                      bgcolor: randomColor,
                                      color: "#1E1E1E",
                                      fontWeight: "bold",
                                      height: "40px",
                                      width: "40px",
                                  }}
                              >
                                  {getInitials(user.name)}
                              </Avatar>
                          )}
                      </ThemeProvider>
                      <Flex marginLeft="8px" flexDirection="column" justifyContent="space-between" alignContent="flex-start">
                          <Text fontWeight="bold" className="x-small" color="#C8C8C8">{user.name}</Text>
                          <Text fontWeight="medium" className="xx-small" color="#929292">{user.email}</Text>
                      </Flex>
                  </Flex>
                  {<LogoutButton />}
              </Flex>
          </Box>
      )
  );
};

export default UserProfile;