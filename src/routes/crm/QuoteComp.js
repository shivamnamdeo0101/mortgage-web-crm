import "./crm.css";
import React,{useState,useEffect} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "../../base";

import {useHistory} from "react-router-dom";

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import {contact_type,process_status_list,quote_status_list} from "../../ListData";
import moment from "moment";
import Loading from "../../Loading";
import GetEmail from "./GetEmail";


function QuoteComp() {

	const [quote_list, set_quote_list] = useState([]);
	const [process_status, set_process_status] = useState("");
	const [lead_status_text, set_lead_status_text] = useState("");
	const [quote_status, set_quote_status] = useState("first_name");

	const [lead_source_text, set_lead_source_text] = useState("");
	const [state, set_state] = useState("");

	const [search, set_search] = useState("");

	const history  = useHistory();

	const [loading, setLoading] = useState(true);


	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('quotes')
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const quote_list_ = [];
  
        querySnapshot.forEach(doc => {


        			 quote_list_.push({
        		  	...doc.data(),
          	 		 key: doc.id
        		  });
        	
        		 
        	       
        	      

        });
    
        set_quote_list(quote_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [search,process_status,quote_status]); 

if(loading){
	return(
		<Loading />
	)
}






	const sort_by_fun = (e)=>{
		set_quote_status(e.target.value);
	}

	const delete_quote = (id)=>{
		if(window.confirm("Are you sure to delete this quote ?")){
			firebase.firestore()
      		.collection('quotes')
      		.doc(id)
      		.delete()

      		alert("Quote Deleted");
		}
	}

	const edit_quote = (email)=>{
		history.push("/edit_quote/"+`${email}`);
	}


	const add_quote = ()=>{
		history.push("/add_quote");
	}

	const view_contact = (email)=>{
		history.push("/view_contact/"+`${email}`);
	}


	return (
		<div>

			<div className="contact_filter">


				

				<div className="filter_contact_comp">
					<div className="blue_button" onClick={()=>add_quote()}>
						<p>+ New</p>
					</div>
				</div>

				<div className="filter_contact_comp">
					<label>Search</label>
						<input type="text" value={search} onChange={(e)=>set_search(e.target.value)} />
							
				</div>

				<div className="filter_contact_comp">
					<label>Quote Status</label>
						<select value={quote_status} onChange={(e)=>set_quote_status(e.target.value)}>
							{
								quote_status_list.map((item)=>(
									<option key={item.key} value={item.val} >{item.data}</option>
								))
							}
							
							
						</select>
				</div>
				<div className="filter_contact_comp">
					<label>Process Status</label>
						<select value={process_status} onChange={(e)=>set_process_status(e.target.value)}>
							{
								process_status_list.map((item)=>(
									<option key={item.key} value={item.val} >{item.data}</option>
								))
							}
							
							
						</select>
				</div>
				
			
			</div>

			<div className="fetch_data">
				<p>Total Result Fetched : {quote_list.length}</p>
			</div>

			<div className="inbox_render">

				{
					quote_list.map((item)=>(



						<div className="task_render_comp " >

							<div className="inbox_render_comp">
									
									<div className="contact_render_content">
										
											
									
											<div className="contact_data">
												<label>Status</label>
												<p>{item.quote_status}</p>
											</div>
											<div className="contact_data">
												<label>Quote Name</label>
												<p>{item.quote_name}</p>
											</div>
											
											<div className="contact_data">
												<label>Date Modified</label>
												<p>{moment(item.timestamp).format("LLL")}</p>
											</div>
											<div className="contact_data">
												<label>Date Created</label>
												<p>{moment(item.date_created).format("LLL")}</p>
											</div>
											<div className="contact_data">
												<label>Email</label>
												<p><GetEmail contact_id={item.user}/></p>
											</div>
									</div>

							</div>

							<div className="task_operations">
								<IconButton  onClick={()=>edit_quote(item.key)}>
									<EditIcon style={{color:"#474a94"}} />
								</IconButton>
								<IconButton onClick={()=>delete_quote(item.key)}>
									<DeleteIcon style={{color:"#474a94"}} />
								</IconButton>
							</div>


						</div>

					))
				}


			</div>

			
		</div>
	)
}


export default QuoteComp