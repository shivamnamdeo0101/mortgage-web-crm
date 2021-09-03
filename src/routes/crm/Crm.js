import React,{useState,useEffect} from 'react';
import firebase from "../../base.js";
import {useParams,useHistory} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';



import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import "../../routes/dash_arch.css";
import InboxComp from "./InboxComp";
import ContactComp from "./ContactComp";
import TaskComp from "./TaskComp";
import QuoteComp from "./QuoteComp";



function Crm() {

	  let { route ,crm_tab} = useParams();

	  const history  = useHistory();



	  const [comp_val, set_comp_val] = useState(crm_tab);




	 const make_route = (val)=>{
		history.push("/Crm/"+`${val}`);
	}

	const set_comp_val_fun = (val)=>{
		set_comp_val(val);
		history.push("/Crm/"+`${val}`);
	}

	return (
		<div className="dash">
				<Header />
				<div className="dash_board_grid">
					<NavBar />
					<div	className="dash_board_main">


						<div className="dash_menu_data">

							<div className="route_name">
								<p>CRM</p>
							</div>


							<div className="crm_switch_screen">

								<div className={comp_val == "inbox" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val_fun("inbox")}>
									<p>Inbox</p>
								</div>
								<div className={comp_val == "contacts" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val_fun("contacts")}>
									<p>Contacts</p>
								</div>
								<div className={comp_val == "tasks" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val_fun("tasks")}>
									<p>Tasks</p>
								</div>
								<div className={comp_val == "quotes" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val_fun("quotes")}>
									<p>Quotes</p>
								</div>
										
							</div>

							<div className="crm_switch_render">

								{comp_val == "inbox" && <InboxComp />}
								{comp_val == "contacts" && <ContactComp />}
								{comp_val == "tasks" && <TaskComp />}
								{comp_val == "quotes" && <QuoteComp />}


							</div>





						</div>

						

					</div>

				</div>

		</div>
	)
}

export default Crm;