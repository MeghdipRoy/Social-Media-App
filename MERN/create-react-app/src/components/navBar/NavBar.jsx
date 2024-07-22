import React, { useContext } from 'react';
import "./navBar.scss"
import { Link } from 'react-router-dom';
import { IoIosSearch } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaMoon } from "react-icons/fa";
import { IoAppsSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { ImProfile } from "react-icons/im";
import { IoIosMail } from "react-icons/io";
import { IoIosNotifications } from "react-icons/io";
import { IoIosSunny } from "react-icons/io";
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';


const NavBar = () => {

    const {toggle , darkMode} = useContext(DarkModeContext)
    const {currentUser} = useContext(AuthContext)

    console.log(currentUser.profilePic)
    console.log(currentUser.name)

  return (
    <div className='navbar'>
        <div className="left">
            <Link to="/" style={{textDecoration:"none"}}>
           <span>Universe Social</span>
           </Link>
           <IoMdHome/>
         {darkMode ?
         (<IoIosSunny onClick={toggle}/>) :
          (<FaMoon onClick={toggle}/>)
         }  
         <IoAppsSharp/>
            <div className="search">
                <IoIosSearch/>
                <input type="text" placeholder='Search...'/>
            </div>
            
        </div>
        <div className="right">
            <CgProfile/>
            <IoIosMail/>
            <IoIosNotifications/>
            <div className="user">
            <img
            src={"/upload/"+currentUser.profilePic}
            alt=""
         />
         
                <span>{currentUser.name}</span>
            </div>
        </div>
    </div>
  )
}

export default NavBar