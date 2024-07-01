import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Account from "./pages/Account";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import AuthContext from "./context/AuthContext";
import { TUser } from "./types";

export default function App() {
  const [user, setUser] = useState<TUser | undefined>(undefined)

  const login = (data: TUser) => {
    localStorage.setItem('user', JSON.stringify(data))
    setUser(data)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(undefined)
  }

  useEffect(() => {
    const data = localStorage.getItem('user')
    if (data) {
      try {
        const user = JSON.parse(data || '{}')
        setUser(user)
      } catch(error) {
        console.error({error})
      }
    }
  }, [])

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
      <AuthContext.Provider value={{user, login, logout}}>
       <ToastContainer />
      <RouterProvider router={router} />
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}