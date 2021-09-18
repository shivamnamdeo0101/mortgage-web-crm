import "./crm.css";
import React,{useState,useEffect} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import firebase from "../../base";

import {useHistory} from "react-router-dom";

import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import {contact_type,sort_by,lead_status,lead_source,state_list} from "../../ListData";
import moment from "moment";
import Loading from "../../Loading";

function ContactComp() {

	const [user_list, set_user_list] = useState([]);
	const [contact_type_text, set_contact_type_text] = useState("");
	const [lead_status_text, set_lead_status_text] = useState("");
	const [sort_by_text, set_sort_by_text] = useState("createTime");

	const [lead_source_text, set_lead_source_text] = useState("");
	const [state, set_state] = useState("");

	const [search, set_search] = useState("");

	const history  = useHistory();

	const [loading, setLoading] = useState(true);


	useEffect(() => {

    const subscriber = firebase.firestore()
    
      .collection('contact')
      .orderBy(sort_by_text,'desc')
      .onSnapshot(querySnapshot => {
        
        const user_list_ = [];
  
        querySnapshot.forEach(doc => {


       if((doc.data().FullName.toLowerCase().includes(search.toLowerCase())||doc.data().Email.toLowerCase().includes(search.toLowerCase())) 



       	){

        			 user_list_.push({
        		  	...doc.data(),
          	 		 key: doc.id
        		  });
        	}
        		 
        	       
        	      

        });
    
        set_user_list(user_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [sort_by_text,search,lead_source_text,lead_status_text,contact_type_text,state]); 

if(loading){
	return(
		<Loading />
	)
}


	const sort_by_fun = (e)=>{
		set_sort_by_text(e.target.value);
	}

	const delete_contact = (id)=>{
		if(window.confirm("Are you sure to delete this contact ?")){
			firebase.firestore()
      		.collection('contact')
      		.doc(id)
      		.delete()

      		alert("Contact Deleted");
		}
	}

	const edit_contact = (email)=>{
		history.push("/edit_contact/"+`${email}`);
	}


	const add_contact = ()=>{
		history.push("/add_contact");
	}

	const view_contact = (email)=>{
		history.push("/view_contact/"+`${email}`);
	}


	const which_type=(type)=>{
		switch(type){
			case "fqb":
				return "Free Quote Bussiness";
			case "fqr":
				return "Free Quote Residential";
			case "lb":
				return "Free Quote Loan Bussiness";
			default:
				return "None";
		}
			
	}



	return (
		<div>

			<div className="contact_filter">


				

				<div className="filter_contact_comp">
					<div className="blue_button" onClick={()=>add_contact()}>
						<p>+ New</p>
					</div>
				</div>

				<div className="filter_contact_comp">
					<label>Search</label>
						<input type="text" value={search} onChange={(e)=>set_search(e.target.value)} />
							
				</div>

				<div className="filter_contact_comp">
					<label>Sort By</label>
						<select value={sort_by_text} onChange={(e)=>set_sort_by_text(e.target.value)}>
							{
								sort_by.map((item)=>(
									<option key={item.key} value={item.data} >{item.val}</option>
								))
							}
							
							
						</select>
				</div>
				<div className="filter_contact_comp">
					<label>Contact Type</label>
						<select value={contact_type_text} onChange={(e)=>set_contact_type_text(e.target.value)}>
							{
								contact_type.map((item)=>(
									<option key={item.key} value={item.slug} >{item.val}</option>
								))
							}
							
							
						</select>
				</div>
				<div className="filter_contact_comp">
					<label>Lead Status</label>
						<select value={lead_status_text} name="lead_status" onChange={(e)=>set_lead_status_text(e.target.value)}>
							{
								lead_status.map((item)=>(
									<option key={item.key} value={item.slug} >{item.val}</option>
								))
							}
							
							
						</select>
				</div>
				<div className="filter_contact_comp">
					<label>Lead Source</label>
						<select value={lead_source_text} name="lead_source" onChange={(e)=>set_lead_source_text(e.target.value)}>
							{
								lead_source.map((item)=>(
									<option key={item.key} value={item.slug} >{item.val}</option>
								))
							}
							
							
						</select>
				</div>
				
				<div className="filter_contact_comp">
					<label>State</label>
						<select value={state} onChange={(e)=>set_state(e.target.value)}>
							{
								state_list.map((item)=>(
									<option key={item.key} value={item.slug == "" ? "" :item.slug} >{item.slug == "" ? "All" :item.slug}</option>
								))
							}
							
							
						</select>
				</div>

			</div>

			<div className="fetch_data">
				<p>Total Result Fetched : {user_list.length}</p>
			</div>

			<div className="inbox_render">

				{
					user_list.map((item)=>(



						<div   key={item.key}  className="task_render_comp " >

							<div className="inbox_render_comp">
									
									<div className="contact_render_content">
										
											<div className="contact_data">
												<label>Full Name</label>
												<p>{item.FullName}</p>
											</div>
											
											
											<div className="contact_data">
												<label>Phone</label>
												<p>{item.Phone}</p>
											</div>
											<div className="contact_data">
												<label>Type</label>
												<p>{which_type(item.Type)}</p>
											</div>
											<div className="contact_data">
												<label>Source</label>
												<p>{item.lead_source}</p>
											</div>
											<div className="contact_data">
												<label>Status</label>
												<p>{item.lead_status}</p>
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
												<p>{item.Email}</p>
											</div>
									</div>

							</div>

							<div className="task_operations">
								<IconButton  onClick={()=>edit_contact(item.key)}>
									<EditIcon style={{color:"#474a94"}} />
								</IconButton>
								<IconButton onClick={()=>view_contact(item.key)}>
									<QuestionAnswerIcon style={{color:"#474a94"}} />
								</IconButton>
							</div>


						</div>

					))
				}


			</div>

			
		</div>
	)
}

export default ContactComp