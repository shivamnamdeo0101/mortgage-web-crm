import React,{useState,useEffect} from 'react';
import firebase from "../../base.js";
import ListIcon from '@material-ui/icons/List';
import MailIcon from '@material-ui/icons/Mail';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CallIcon from '@material-ui/icons/Call';
import EventNoteIcon from '@material-ui/icons/EventNote';
import IconButton from '@material-ui/core/IconButton';
import {useHistory} from "react-router-dom";

import "./crm.css";
import Loading from "../../Loading";
import moment from "moment";
import GetEmail from "./GetEmail";


function InboxComp() {

	const history  = useHistory();

		const [filter_val, set_filter_val] = useState("");

	  const [loading, setLoading] = useState(true);
	  const [inbox_list, set_inbox_list] = useState([]);
	  

	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('activity')
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const inbox_list_ = [];
  
        querySnapshot.forEach(doc => {

        	if(doc.data().tag.includes(filter_val)){
        		inbox_list_.push({key:doc.id,...doc.data()});
        	}
			
        	
        });
    
        set_inbox_list(inbox_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [filter_val]); 

  	const view_contact = (email)=>{
		history.push("/view_contact/"+`${email}`);
	}



if(loading){
	return(
		<Loading />
	)
}

	const Switch_Icon = (tag)=>{
		switch(tag){
			case "mail":
				return (<MailIcon style={{color:"#ded357"}}/>);
			case "sms":
				return (<QuestionAnswerIcon style={{color:"#3dad4a"}}/>);
			case "call":
				return (<CallIcon style={{color:"#4c6085"}}/>);
			case "note":
				return (<EventNoteIcon style={{color:"#58a4db"}}/>);
			default:
				return (<ListIcon/>);

		}
	}


	return (
		<div>
			
			<div className="inbox_filter">	

				<div className={filter_val == "" ? "inbox_filter_comp inbox_filter_comp_hover" : "inbox_filter_comp" } onClick={()=>set_filter_val("")}>
					<ListIcon  />
					<p>All</p>
				</div>
				<div className={filter_val == "mail" ? "inbox_filter_comp inbox_filter_comp_hover" : "inbox_filter_comp" } onClick={()=>set_filter_val("mail")}>
					<MailIcon style={{color:"#ded357"}} />
				
				</div>
				<div className={filter_val == "sms" ? "inbox_filter_comp inbox_filter_comp_hover" : "inbox_filter_comp" } onClick={()=>set_filter_val("sms")}>
					<QuestionAnswerIcon style={{color:"#3dad4a"}} />
				
				</div>
				<div className={filter_val == "call" ? "inbox_filter_comp inbox_filter_comp_hover" : "inbox_filter_comp" } onClick={()=>set_filter_val("call")}>
					<CallIcon style={{color:"#4c6085"}}/>
					
				</div>
				<div className={filter_val == "note" ? "inbox_filter_comp inbox_filter_comp_hover" : "inbox_filter_comp" } onClick={()=>set_filter_val("note")}>
					<EventNoteIcon style={{color:"#58a4db"}}/>
				</div>


				

			</div>

			<div className="fetch_data">
				<p>Total Result Fetched : {inbox_list.length}</p>
			</div>

			<div className="inbox_render">

				{
					inbox_list.map((item)=>(

						<div className="inbox_render_comp" onClick={()=>view_contact(item.user)}>

							<div className="index_comp_icon">
								<IconButton>
								{Switch_Icon(item.tag)}
								</IconButton>
							</div>

							<div className="inbox_render_content">
								<div>
									<h3><GetEmail contact_id={item.user}/></h3>
									<p>{moment(item.timestamp).fromNow()}</p>
								</div>
								<p>{item.text}</p>
							</div>


						</div>

					))
				}


			</div>


		</div>
	)
}

export default InboxComp