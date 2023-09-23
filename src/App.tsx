import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import "./index.css";
import Router from "./Router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import TopBar from "./components/layout/TopBar";
import { useState } from "react";
import Login from "./pages/Login";

export const queryClient = new QueryClient();

function App() {
  const [authToken, setAuthToken] = useState(
    localStorage.getItem("@authToken")
  );

  axios.defaults.headers.common["Authorization"] = authToken;

  if (!authToken?.length) {
    return (
      <QueryClientProvider client={queryClient}>
        <Login setAuthToken={setAuthToken} />
      </QueryClientProvider>
    );
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <section className="flex  h-screen">
            <Sidebar setAuthToken={setAuthToken} />
            <div className="w-full">
              <TopBar />
              <Router />
            </div>
          </section>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
