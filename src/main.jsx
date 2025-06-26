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
import ChannelPage from './Components/ChannelPage.jsx'
import { UserProvider } from './Components/UserContex.jsx'
import UploadVideoPage from './Components/UploadVideoPage.jsx'
import VideoPlayerPage from './Components/VideoPlayerPae.jsx'
import VideoEditPage from './Components/VideoEditPage.jsx'

//app routes manages all the routes in the app
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
      {
        path : "/channel/:id",
        element : <ChannelPage/>
      },
      {
        path : "/upload/video",
        element : <UploadVideoPage/>
      },
      {
        path : "/video/:id",
        element : <VideoPlayerPage/>
      },
      {
        path : "/videoedit/:id",
        element : <VideoEditPage/>
      }
    ],
    errorElement : <NotFound/>
  }
]);


createRoot(document.getElementById('root')).render(
    <UserProvider>
      <StrictMode>
        <RouterProvider router={appRouter}/>
      </StrictMode>
    </UserProvider>
)
