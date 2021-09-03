import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import "./comp.css";
import Avatar from '@material-ui/core/Avatar';
import app  from "../../base";
import logo from "../../assets/logo.jpg";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import {useHistory} from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
function Header() {

	const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const history = useHistory();

  const sign_out = () => {
    app.auth().signOut();
  };

  const handleClose = ()=>{
  	 setAnchorEl(null);
  }

  const handle_Profile = ()=>{
  	history.push("/profile")
  }





	return (
		<div className="header">
			
			
			<img src={logo} alt="" />

			<div >
  			<div className="header_head" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
		        <Avatar icon={<AccountCircleIcon />}/>
		        <div className="head_content">  </div>
		        <p className="head_content">{app.auth().currentUser.email}</p>
		      </div>
		      <Menu
		        id="simple-menu"
		        anchorEl={anchorEl}
		        keepMounted
		        open={Boolean(anchorEl)}
		        onClose={handleClose}
		      >
		        <MenuItem onClick={handle_Profile} className="popup_content"><PersonIcon /><p>My Profile</p></MenuItem>
		        <MenuItem onClick={sign_out} className="popup_content"><ExitToAppIcon /><p>Logout</p></MenuItem>
		      </Menu>
  		</div>



		</div>
	)
}

export default Header