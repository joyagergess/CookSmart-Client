import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HouseholdProvider } from "./context/HouseHoldContext";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
     <React.StrictMode>
   <BrowserRouter>
   <AuthProvider>
  <HouseholdProvider>


   
    <QueryClientProvider client={client}>

       <App />
    </QueryClientProvider>

    

  </HouseholdProvider>

   </AuthProvider>
   </BrowserRouter>
   </React.StrictMode>
);
