import React,{useState,useEffect} from 'react';
import firebase from "./base.js";
import {useParams,useHistory} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';



import Header from "./routes/comp/Header";
import NavBar from "./routes/comp/NavBar";
import "./routes/dash_arch.css";


function DashBoard() {

	  let { route } = useParams();

	  const history  = useHistory();


	  const [loading, setLoading] = useState(true);
	  const [user_list, set_user_list] = useState([]);
	  const [task_list, set_task_list] = useState([]);
	  const [quote_list, set_quote_list] = useState([]);


	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('contact')
      .onSnapshot(querySnapshot => {
        
        const user_list_ = [];
  
        querySnapshot.forEach(doc => {

						user_list_.push(1);
        	
        });
    
        set_user_list(user_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 


	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('quotes')
      .onSnapshot(querySnapshot => {
        
        const quote_list_ = [];
  
        querySnapshot.forEach(doc => {

						quote_list_.push(1);
        	
        });
    
        set_quote_list(quote_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 


	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('tasks')
      .onSnapshot(querySnapshot => {
        
        const task_list_ = [];
  
        querySnapshot.forEach(doc => {

					task_list_.push(1);
        	
        });
    
        set_task_list(task_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 
	






	 const make_route = (val)=>{
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
								<p>DashBoard</p>
							</div>


							<div className="dash_menu_data_grid">

									<div className="dash_borad_comp" onClick={()=>make_route("contacts")}>
											<GroupIcon />
											<h2>Leads</h2>
											<h2>{user_list.length}</h2>
											<p>See all your Leads in the CRM</p>
										</div>

										<div className="dash_borad_comp" onClick={()=>make_route("quotes")}>
											<FormatQuoteIcon />
											<h2>Quotes</h2>
											<h2>{quote_list.length}</h2>
											<p>See all your Quotes in the CRM</p>
										</div>
										<div className="dash_borad_comp" onClick={()=>make_route("tasks")}>
											<ListAltIcon />
											<h2>Tasks </h2>
											<h2>{task_list.length}</h2>
											<p>See all your Tasks in the CRM</p>
										</div>
										
										

										
							</div>



						</div>

						

					</div>

				</div>

		</div>
	)
}

export default DashBoard;