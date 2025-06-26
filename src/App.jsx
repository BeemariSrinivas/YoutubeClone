import { useState } from 'react'
import './App.css'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'
import { Outlet } from 'react-router-dom'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  //detects the hamburger menu toggle
  function toggleSidebar(){
    setSidebarOpen((prev)=>!prev);
  }

  //renders the whole app
  return (
    <div id="app">
      <Header toggleSidebar={toggleSidebar}/>
      <div id="mainArea">
        <Sidebar isOpen = {sidebarOpen} />
        {sidebarOpen&&<div id="backdrop" onClick={toggleSidebar}></div>}
        <div id="content">
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default App
