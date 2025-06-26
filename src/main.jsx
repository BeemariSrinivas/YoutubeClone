import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { UserProvider } from './Components/UserContex.jsx'

const NotFound = lazy(()=>import('./Components/NotFoundPage.jsx'));
const HomePage = lazy(()=>import('./Components/HomePage.jsx'));
const UserAuthenticationPage = lazy(()=>import('./Components/UserAuthenticationPage.jsx'));
const UserRegistrationPage = lazy(()=>import('./Components/UserRegistrationPage.jsx'))
const CreateChannelPage = lazy(()=>import('./Components/CreateChannelPage.jsx'));
const ChannelPage = lazy(()=>import('./Components/ChannelPage.jsx'));
const UploadVideoPage = lazy(()=>import('./Components/UploadVideoPage.jsx'));
const VideoPlayerPage = lazy(()=>import('./Components/VideoPlayerPae.jsx'));
const VideoEditPage = lazy(()=>import('./Components/VideoEditPage.jsx'));

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
        <Suspense fallback={<div style={{"textAlign":"center","paddingTop":"50px"}}>Loading......</div>}>
          <RouterProvider router={appRouter}/>
        </Suspense>
      </StrictMode>
    </UserProvider>
)
