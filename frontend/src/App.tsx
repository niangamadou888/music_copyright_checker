import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  const queryClient = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/account/:tab",
      element: <Account />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
       <ToastContainer />
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}