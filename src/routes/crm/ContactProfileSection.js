import React,{useState,useEffect} from 'react';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import CallIcon from '@material-ui/icons/Call';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import EmailIcon from '@material-ui/icons/Email';
import EventNoteIcon from '@material-ui/icons/EventNote';
import firebase from "../../base";
import moment from "moment";
import EditIcon from '@material-ui/icons/Edit';
import BackspaceIcon from '@material-ui/icons/Backspace';
import Tooltip from '@material-ui/core/Tooltip';
import emailjs from 'emailjs-com';
import "./crm.css";

import ListIcon from '@material-ui/icons/List';
import MailIcon from '@material-ui/icons/Mail';
import {useHistory} from "react-router-dom";
import Loading from "../../Loading";




function ContactProfileSection({contact_id}) {


		const history  = useHistory();

		const [filter_val, set_filter_val] = useState("");
		  const [comp_val, set_comp_val] = useState("sms");
		const [loading, setLoading] = useState(true);
		const [act_list, set_act_list] = useState([]);

		const [text, set_text] = useState("");
		const [act_id, set_act_id] = useState("");




		const [user, set_user] = useState({});
	useEffect(() => {

		if(contact_id){
			 const subscriber = firebase.firestore()
      .collection('contact')
      .doc(contact_id)
      .onSnapshot(doc => {
        
        set_user({key:doc.id,...doc.data()});
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
		}

   
  }, [contact_id]); 


	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('activity')
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const act_list_ = [];
  
        querySnapshot.forEach(doc => {

        	
        	if(contact_id == doc.data().user && doc.data().tag.includes(filter_val)){
        		act_list_.push({
        		  	...doc.data(),
          	 		 key: doc.id
        		 });
        			
        	}
        	
        	
        	
        		        		 

        });
    		

        set_act_list(act_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [filter_val]); 


if(loading){
	return(
			<Loading />
	)
}

	
	console.log(process.env);

	const add_act = (tag)=>{

		if(tag == "mail"){
			send_mail();
		}

		if(tag == "sms"){
			send_sms();
		}

		firebase.firestore()
       	.collection('activity')
       	.add({text,tag,timestamp:Date.now(),user:contact_id});

       	alert("Activity Added");
       	set_text("");
	}

	const delete_chat = (id)=>{
		if(window.confirm("Are you sure to delete this activity")){
			firebase.firestore()
       	.collection('activity')
       	.doc(id)
       	.delete()

       	alert("Activity Deleted");
       	
		}

	}

	const edit_chat = (item)=>{
		set_text(item.text);
		set_act_id(item.key);

	}


	const send_sms = ()=>{

		var params = {
		    name: user.FullName,
		    body:text,
		    to:user.Phone,
		};



    fetch("http://localhost:4000/api/send-sms", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })
    .then(res => res.json())
    .then(data => {

    		console.log(data);
       if(data.success){
       	alert("SMS Sent")
       }else{
       	alert("SMS added To CRM but not sent check your Twilio credits or contact No in format with country code or not !");
       }
    })

}
	
	const edit_act_fire = (tag)=>{


		if(tag == "mail"){
			send_mail();
		}
		if(tag == "sms"){
			send_sms();
		}

		firebase.firestore()
       	.collection('activity')
       	.doc(act_id)
       	.set({text,tag,timestamp:Date.now(),user:contact_id},{merge:true});

       	alert("Activity Edited");
       	set_act_id("");
       	set_text("");
	}

	const send_mail = ()=>{
		var templateParams = {
		    name: user.FullName,
		    message:text,
		    to_name:user.Email,
		    from_name:"aryansn0101@gmail.com",
		};
 
		emailjs.send('service_hv2jtqn', 'template_9bcfmza', templateParams,"user_x9vAOPZv8OKN2EnsDJWAF")
    .then(function(response) {
       console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
       console.log('FAILED...', error);
    });
	}

	const bg_color = (tag)=>{
		switch(tag){
			case "call" :
				return "#789";
			case "note" :
				return "#143";
			case "sms" :
				return "#f03";
			case "mail" :
				return "#786";
			default :
				return "#789";

		}
	}

		const Switch_Icon = (tag)=>{
		switch(tag){
			case "mail":
				return (<MailIcon style={{color:"#ded357"}}/>);
			case "sms":
				return (<QuestionAnswerIcon style={{color:"#3dad4a"}}/>);
			case "note":
				return (<EventNoteIcon style={{color:"#58a4db"}}/>);
			default:
				return (<ListIcon/>);

		}
	}





	return (
		<div  className="comp_head">
			
			<div className="chat">
			
			<div className="crm_switch_screen margin_bottom">

								<div className={comp_val == "note" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("note")}>
									<p>Create Note</p>
								</div>
								<div className={comp_val == "mail" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("mail")}>
									<p>Send Email</p>
								</div>
								<div className={comp_val == "sms" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("sms")}>
									<p>Sent Text</p>
								</div>
								
										
							</div>
			

			<div className="chat_box">
				<textarea type="text" value={text} onChange={(e)=>set_text(e.target.value)}  placeholder="Send a message..."/>
			</div>

			

			<div className="row_button margin_bottom">

				


				{comp_val == "sms" && <div  className="blue_button"  onClick={()=>act_id ? edit_act_fire("sms") : add_act("sms")}>	
									<p>Send Text</p>
								</div>}
				{comp_val == "mail" &&<div  className="blue_button"  onClick={()=>act_id ? edit_act_fire("mail") : add_act("mail")}>	
					<p>Send Email</p>
				</div>}
				{comp_val == "note" &&<div  className="blue_button"  onClick={()=>act_id ? edit_act_fire("note") : add_act("note")}>	
					<p>Create Note</p>
				</div>}

			</div>


			<div className="inbox_filter ">	

				
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
				
				<div className={filter_val == "note" ? "inbox_filter_comp inbox_filter_comp_hover" : "inbox_filter_comp" } onClick={()=>set_filter_val("note")}>
					<EventNoteIcon style={{color:"#58a4db"}}/>
					
				</div>


				

			</div>
				<div  className="inbox_filter_comp">
					
					<p>Total Results Fetched  : {act_list.length}</p>
				</div>
			<div className="chat_main">

				

				<div className="inbox_render">

				{
					act_list.map((item)=>(



						<div key={item.key} className="task_render_comp ">

							<div className="inbox_render_comp">
									<div className="index_comp_icon">
									
										<IconButton>
										{Switch_Icon(item.tag)}
										</IconButton>
									</div>

									<div className="inbox_render_content">
										<div>
										
											<p>{moment(item.timestamp).fromNow()}</p>
										</div>
										
										<p>{item.text}</p>
									</div>

							</div>

							<div className="task_operations">
								<IconButton  onClick={()=>edit_chat(item)}>
									<EditIcon style={{color:"#474a94"}} />
								</IconButton>
								<IconButton onClick={()=>delete_chat(item.key)}>
									<DeleteIcon style={{color:"#f03"}} />
								</IconButton>
							</div>


						</div>

					))
				}


			</div>

			</div>

		</div>

	</div>
	)
}

export default ContactProfileSection