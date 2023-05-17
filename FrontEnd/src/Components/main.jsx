import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import  { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { Auth0Provider } from "@auth0/auth0-react";

const DOMAIN = import.meta.env.VITE_DOMAIN;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;


ReactDOM.createRoot(document.getElementById("root")).render(
    <Auth0Provider
        domain= {DOMAIN}
        clientId= {CLIENT_ID}
        authorizationParams={{
            redirect_uri:  window.location.origin + "/dashboard"
        }}
    >
        <ChakraProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </ChakraProvider>
    </Auth0Provider>
);
