import './App.css'
import React, { useState } from 'react';
import { BrowserRouter,Link,Routes,Route } from 'react-router-dom'
import AddStaff from './components/AddStaff.jsx'
import ViewStaff from './components/ViewStaff.jsx'
import HomePage from './components/HomePage.jsx'
import EditStaff from './components/EditStaff.jsx'
import SearchStaff from './components/SearchStaff.jsx'

function App() {
  const bodyPd = document.getElementById("body-pd")
    
  const [navbarToggle,setNavbarToggle] = useState("");
  const [headerToggle,setHeaderToggle] = useState("");
  const [header,setHeader] = useState("");
  const handdleToggleSidebar = ()=>{
      if(navbarToggle==""){
          setNavbarToggle("show")
          setHeaderToggle("bx-x")
          setHeader("body-pd")
          bodyPd.classList.add("body-pd")
      }
      else{
          setNavbarToggle("")
          setHeaderToggle("")
          setHeader("")
          bodyPd.classList.remove("body-pd")
      }
  }
  return (
    <>
        <BrowserRouter>
        <header className={`header ${header}`} id="header" >
            <div className="header_toggle"> <i className={`bx bx-menu ${headerToggle}`} onClick={handdleToggleSidebar} id="header-toggle"></i> </div>
            <div className="header_img d-flex align-items-center">
                <Link to={"/search"}  ><i className='bx bx-search' ></i> </Link>
            </div>
        </header>
    
        <div className={`l-navbar ${navbarToggle}`} id="nav-bar">
            <nav className="nav">
                <div> 
                    <a href="/" className="nav_logo"> 
                        <i className='bx bx-layer nav_logo-icon'></i>
                        <span className="nav_logo-name">LOGO</span> 
                    </a>
                    <div className="nav_list">       
                    <Link to={"/"} className="nav_link">
                        <i className='bx bx-grid-alt nav_icon'></i> 
                        <span className="nav_name">Dashboard</span> 
                    </Link> 
                    <Link to={"/addstaff"} className="nav_link">
                        <i className='bx bxs-message-square-add'></i>
                        <span className="nav_name">Add Staff</span> 
                    </Link>    
                    <Link to={"/viewstaff"} className="nav_link">
                        <i className='bx bx-library'></i>
                        <span className="nav_name">View Staff</span> 
                    </Link>        
                    </div>
                </div> 
            </nav>
        </div>
        
        <Routes>
            <Route path={"/"} element={<HomePage />} />
            <Route path={"/addstaff"} element={<AddStaff />}/>
            <Route path={"/viewstaff"} element={<ViewStaff />}/>
            <Route path={"/editstaff/:id"} element={<EditStaff />}/>
            <Route path={"/search"} element={<SearchStaff />}/>
        </Routes>
    </BrowserRouter>

      
    </>
  )
}

export default App