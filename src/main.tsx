import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import "./index.css";
import AppThemeProvider from "./theme/AppThemeProvider.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            staleTime: 1000 * 60 * 5,
        },
    },
});


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>

            <QueryClientProvider client={queryClient}>
              <AppThemeProvider>
                <App/>
              </AppThemeProvider>

               

            </QueryClientProvider>

        </BrowserRouter>

    </StrictMode>
);