import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HouseholdProvider } from "./context/HouseHoldContext";

const client = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
   <AuthProvider>
  <HouseholdProvider>

  <React.StrictMode>
    <BrowserRouter>
    <QueryClientProvider client={client}>

       <App />
    </QueryClientProvider>

    </BrowserRouter>
    </React.StrictMode>
  </HouseholdProvider>

   </AuthProvider>
);
