import { Flex, Text, Image } from "@chakra-ui/react"
import { useAuth0 } from '@auth0/auth0-react';

export const GoogleButton = () => {

    const { loginWithRedirect } = useAuth0();

    function handleLogin() {
        loginWithRedirect()
    }

    return (
        <Flex
            onClick={() => {
                handleLogin()
            }}
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="white"
            height="44px"
            width="260px"
            borderRadius="4px"
            border="1px solid #cfcfcf"
            boxShadow="-2px 4px 6px rgba(0, 0, 0, 0.5)"
            _hover={{
                cursor: "pointer",
            }}
            _active={{
                boxShadow: "-0px 2px 6px rgba(0, 0, 0, 0.5)",
                transform: "translateY(1px) translateX(-1px)",
            }}
        >
            <Image
                marginLeft="26px"
                src="./assets/GoogleLogo.png"
                height="32px"
                width="32px"
            />
            <Text
                marginRight="28px"
                color="#4A4A4A"
                className="x-small"
                fontWeight="bold"
            >
                Continue with Google
            </Text>
        </Flex>
    );
}