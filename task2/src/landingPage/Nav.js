import {React , useState, useContext} from "react";
import Logo from "./pics/Logo.svg";
import dropdown from "./pics/icons8-drop-down-50.png";
import { BsCart2 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useMediaQuery from '@mui/material/useMediaQuery';

const Navbar = () => {

  const authContext = useContext(AuthContext);
  const {loginSuccess , username} = authContext;
  const {logout} = authContext;
  const navigate = useNavigate();
  const [dropdownVisible , setDropdownVisible] = useState(false);
  const isLargeScreen = useMediaQuery('(min-width:850px)'); 
  const isNotLargeScreen = useMediaQuery('(max-width:850px)');

  const handleDropdownVisibility = () => {
    console.log('dropdown triggered');
    setDropdownVisible(!dropdownVisible);
  }

  const handleLogout = () => {
    logout();
    Swal.fire({
      icon: 'success',
      title: 'See you soon!',
      text: ' You have been successfully logged out!',
    });
    navigate('/');
    setDropdownVisible(false);
    console.log('logged out');
  }

  return (
    <nav>
      <div className="logo">
        <img src={Logo} alt="" />
      </div>
      {isLargeScreen && ( 
      <div className="links">
        <a href="">Home</a>
        <a href="">About</a>
        <a href="">Contact</a>
        <a href="">
          <BsCart2 className="navbar-cart" />
        </a>
        {
          loginSuccess 
          ? (<span><button className="wel-text" onClick={handleDropdownVisibility}>Welcome {username} <img src={dropdown} className="drop" /></button>
            {dropdownVisible && 
            (<div className="dropdown-links">
              <button>Your Account</button>
              <button onClick={handleLogout}>Logout</button>
            </div>)
            }
            </span>)
          : (<button className="button1"><Link to={"/login"}>Login</Link></button>)
        }
      </div>
      )}
      {isNotLargeScreen && ( 
        <div>
        {
          loginSuccess 
          ? (<span><button className="wel-text2" onClick={handleDropdownVisibility}>Welcome {username} <img src={dropdown} className="drop" /></button>
            {dropdownVisible && 
            (<div className="nav-links">
              <button>Your Account</button>
              <button onClick={handleLogout}>Logout</button>
            </div>)
            }
            </span>)
          : (<button className="button1" ><Link to={"/login"} style={{ color:'black',textDecoration:'none'}}>Login</Link></button>)
        }
        
      </div>
      )}
    </nav>
  );
};

export default Navbar;