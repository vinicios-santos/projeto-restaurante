import "./index.css";
import Router from "routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@utils/queryClient";


function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
