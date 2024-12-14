import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RouterPages from "./Router/RouterPages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { defaultOptions } from "./configs/reactQuer";

const App = () => {
  const queryClient = new QueryClient({
    defaultOptions,
  });

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <RouterPages />
      </QueryClientProvider>
    </Router>
  );
};

export default App;
