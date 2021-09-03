import React from 'react';
import "./comp.css";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';

import HomeIcon from '@material-ui/icons/Home';
import ContactsIcon from '@material-ui/icons/Contacts';
import {useHistory} from "react-router";
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
function NavBar() {


	const history = useHistory();
	const MakeRoute = (text) =>{
    	history.push(`/${text}`);
  	}

	return (
		<div >

			<div className="nav_bar">
			<IconButton onClick={()=>MakeRoute("DashBoard")}>
				<HomeIcon style={{color:"#555"}}/>
			</IconButton>
			<IconButton onClick={()=>MakeRoute("Crm/inbox")}>
				<ContactsIcon style={{color:"#555"}} />
			</IconButton>
			
			<IconButton onClick={()=>MakeRoute("members")}>
				<PeopleAltIcon style={{color:"#555"}}/>
			</IconButton>
			</div>

			
		</div>
	)
}

export default NavBar