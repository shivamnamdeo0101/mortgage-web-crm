import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import firebase from "../../base";
import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import {useHistory} from "react-router-dom";
import GetEmail from "./GetEmail";

import "./crm.css";

function AddTaskUser() {

	const {contact_id}  = useParams();


	const history = useHistory();

	const [loading, setLoading] = useState(true);
	const [task, set_task] = useState({status:false});

		const [user, set_user] = useState({});

			useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('contact')
      .doc(contact_id)
      .onSnapshot(doc => {
       
        set_user({key:doc.id,...doc.data()});
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 

	function handleChange(evt) {
  		const value =
    		evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  		set_task({
    		...task,
    		[evt.target.name]: value
  		});
	}







		const on_add = (e)=>{
		e.preventDefault();

			if(task){
				firebase.firestore()
		.collection('tasks')
		.add({...task,user:contact_id,timestamp:Date.now()});

		alert("Task Added");


		go_back();
	}else{
		alert("Enter All Details");
	}

			
	}

	const go_back = ()=>{
		history.push("/Crm/tasks");
	}


	return (
		<div>
			<div className="dash">
				<Header />
				<div className="dash_board_grid">
					<NavBar />
					<div	className="dash_board_main">

						<div className="route_name">
							<p>{" Add Task"}</p>
						</div>
						

						<div className="task_form_grid">

							<form onSubmit={on_add}>

								<div className="form_data">

								<div className="edit_task_from_comp">
									<label>Comment</label>
									<textarea type="text" cols="40" rows="5" name="comment" value={task.comment} onChange={handleChange} />
								</div>
								
								<div className="edit_task_from_comp">
									<label>Due Date</label>
									<input type="date" name="due_date" value={task.due_date} onChange={handleChange} />
								</div>
								<div className="edit_task_from_comp">
									<label>Completed Status</label>
									<input type="checkbox" name="status" checked={task.status} onChange={handleChange} />
								</div>
								<div className="edit_task_from_comp">
									<label>Time</label>
									<input type="time" name="time" value={task.time} onChange={handleChange} />
								</div>
								<div className="edit_task_from_comp">
									<label>Select User</label>
										<input type="text" value={user.Email} disabled />
								</div>
								<div className="edit_task_from_comp">
									<label>Select Contact Method</label>
										<select value={task.tag} name ="tag" onChange={handleChange}>
										{
											["","mail","comment","sms","text","call"].map((item)=>(
												<option  key={item.key} value={item}> {item}</option>
											))
											}						
									</select>
								</div>

								</div>

								<div className="edit_task_from_comp">
									
									<button className = "blue_button" type="submit" name="submit">Submit</button>
								</div>

							</form>

						</div>

					</div>

				</div>

			</div>
		</div>
	)
}

export default AddTaskUser