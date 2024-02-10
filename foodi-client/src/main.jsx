import { createRoot } from "react-dom/client"; // Corrected import
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router.jsx";
import AuthProvider from "./contexts/AuthProvider.jsx";

// tanstack query
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

const container = document.getElementById("root"); // Get the container element

// Check if the container is not null to avoid errors in non-browser environments
if (container) {
  const root = createRoot(container); // Create a root
  root.render(
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
} else {
  console.error("Failed to find the root container.");
}
