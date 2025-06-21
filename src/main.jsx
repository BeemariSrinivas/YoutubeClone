import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './Components/NotFoundPage.jsx'
import HomePage from './Components/HomePage.jsx'
import UserAuthenticationPage from './Components/UserAuthenticationPage.jsx'
import UserRegistrationPage from './Components/UserRegistrationPage.jsx'
import CreateChannelPage from './Components/CreateChannelPage.jsx'

const appRouter = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path : "/",
        element : <HomePage/>
      },
      {
        path : "/authentication",
        element : <UserAuthenticationPage/>
      },
      {
        path : "/register",
        element : <UserRegistrationPage/>
      },
      {
        path : "/createChannel",
        element : <CreateChannelPage/>
      },
    ],
    errorElement : <NotFound/>
  }
]);


createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}>
    <StrictMode>
    <App />
  </StrictMode>,
  </RouterProvider>
)
