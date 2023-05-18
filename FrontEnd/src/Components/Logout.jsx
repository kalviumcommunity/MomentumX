import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from '@chakra-ui/react';

const LogoutButton = () => {
    const { logout } = useAuth0();
  
    return (
        <Button
            sx={{
                bgColor: "#121212",
                padding: "0px",
                height: "28px",
                minWidth: "28px",
                maxWidth: "28px",
                "&:hover" : {
                    cursor: "pointer",
                    bgColor: "#121212"
                }
            }}
            onClick={() =>
                logout({ logoutParams: { returnTo: window.location.origin } })
            }

        >
            <LogoutIcon
                sx={{
                    color: "#C8C8C8",
                    fontSize: "28px",
                    transform: "rotate(180deg)",
                }}
            />
        </Button>
    );
};

export default LogoutButton