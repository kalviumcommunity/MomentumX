import { useAuth0 } from "@auth0/auth0-react";
import { Heading } from "@chakra-ui/react"
import UserProfile from "./UserProfile";

function Dashboard() {
    const LogoutButton = () => {
        const { logout } = useAuth0();
      
        return (
          <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
            Log Out
          </button>
        );
      };
      

    return (
        <>
            <Heading fontSize="30px">DashBoard</Heading>
            <UserProfile />
            {LogoutButton()}
        </>
    ) 
    
}

export default Dashboard