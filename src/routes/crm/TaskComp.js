import React,{useState,useEffect} from 'react'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import firebase from "../../base";
import {useHistory} from "react-router-dom";
import moment from "moment";
import Chip from '@material-ui/core/Chip';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import "./crm.css";
import ListIcon from '@material-ui/icons/List';
import MailIcon from '@material-ui/icons/Mail';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import CallIcon from '@material-ui/icons/Call';
import EventNoteIcon from '@material-ui/icons/EventNote';
import Loading from "../../Loading";
import GetEmail from "./GetEmail";


function TaskComp() {


		const [task_list, set_task_list] = useState([]);
		const [sort_by_text, set_sort_by_text] = useState("");

		const [search, set_search] = useState("");


		const [filter, set_filter] = useState(false);

	const history  = useHistory();

	const [loading, setLoading] = useState(true);



	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('tasks')
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const task_list_ = [];
  
        querySnapshot.forEach(doc => {

        	console.log(doc.data().user);

        	if(doc.data().status == filter){
        		task_list_.push({
        		  	...doc.data(),
          	 		 key: doc.id
        		  });
        	}


      
        	


        });
    
        set_task_list(task_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [filter]); 


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
      		.collection('tasks')
      		.doc(id)
      		.delete()

      		alert("Contact Deleted");
		}
	}

	const edit_task = (task_id)=>{
		history.push("/edit_task/"+`${task_id}`);
	}


	const add_task = ()=>{
		history.push("/add_task");
	}

	const view_contact = (task_id)=>{
		history.push("/view_contact/"+`${task_id}`);
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

	const Switch_Status = (status)=>{
		switch(status){
			case true:
				return (<CheckCircleIcon style={{color:"green"}}/>);
			case false:
				return (<ErrorOutlineIcon style={{color:"#f03"}}/>);	
			default:
				return (<ErrorOutlineIcon style={{color:"#f03"}}/>);

		}
	}


	

	const set_filter_fun = (item)=>{

		const s = item.status == true ? false : true; 

		firebase.firestore() 
      		.collection('tasks')
      		.doc(item.key)
      		.set({status:s},{merge:true});

      		alert("Status Updated");
	}

	return (
		<div>


			<div className="task_filter">

				<div className="task_filter_comp">
					<input type="checkbox" name="status" checked={filter} onChange={(e)=>set_filter(e.target.checked)} />
					<p>Show Completed</p>
				</div>

				<div className="blue_button" onClick={()=>add_task()}>
					<p>+ Add Task</p>
				</div>

			</div>

			<div className="fetch_data">
				<p>Total Result Fetched : {task_list.length}</p>
			</div>

			<div className="inbox_render">

				{
					task_list.map((item)=>(



						<div key={item.key} className="task_render_comp ">

							<div className="inbox_render_comp">
									<div className="index_comp_icon">
										<IconButton>
										<input type="checkbox" name="status" defaultValue={true}
										 checked={item.status} onChange={(e)=>set_filter_fun(item)} />
										</IconButton>
										<IconButton>
										{Switch_Status(item.status)}
										</IconButton>
										<IconButton>
										{Switch_Icon(item.tag)}
										</IconButton>
									</div>

									<div className="inbox_render_content">
										<div>
											<h3><GetEmail contact_id={item.user}/></h3>
											<p>{moment(item.timestamp).fromNow()}</p>
										</div>
										<p>{item.due_date}</p>
										<p>{item.time}</p>
										<p>{item.comment}</p>
									</div>

							</div>

							<div className="task_operations">
								<IconButton  onClick={()=>edit_task(item.key)}>
									<EditIcon style={{color:"blue"}} />
								</IconButton>
								<IconButton onClick={()=>delete_contact(item.key)}>
									<DeleteIcon style={{color:"#f03"}} />
								</IconButton>
							</div>


						</div>

					))
				}


			</div>
		</div>
	)
}

export default TaskComp