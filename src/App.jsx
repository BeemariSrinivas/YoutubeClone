import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function toggleSidebar(){
    setSidebarOpen((prev)=>!prev);
  }

  return (
    <div id="app">
      <Header toggleSidebar={toggleSidebar}/>
      <div id="mainArea">
        {sidebarOpen&&<Sidebar/>}
        <div id="content">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default App
