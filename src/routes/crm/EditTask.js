import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import firebase from "../../base";
import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import {useHistory} from "react-router-dom";
import GetEmail from "./GetEmail";
import "./crm.css";

function EditTask() {

	const {task_id}  = useParams();


	const history = useHistory();

	const [loading, setLoading] = useState(true);
	const [task, set_task] = useState({status:false});


	const [se_user, set_se_user] = useState("");

		const [user_list, set_user_list] = useState([]);
			useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('contact')
      .orderBy('FullName','desc')
      .onSnapshot(querySnapshot => {
        
        const user_list_ = [];
  
        querySnapshot.forEach(doc => {

        		user_list_.push({key:doc.id,email:doc.data().Email});
    
        	


        });
    
        set_user_list(user_list_);
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



	useEffect(() => {

		if(task_id){
			 const subscriber = firebase.firestore()
      .collection('tasks')
      .doc(task_id)
      .onSnapshot(doc => {
        
        set_task({key:doc.id,...doc.data()});
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
		}

   
  }, [task_id]); 


	const on_submit = (e)=>{
		e.preventDefault();

			firebase.firestore()
		.collection('tasks')
		.doc(task_id)
		.set({...task,user:task.user,timestamp:Date.now()},{merge:true});

		alert("Form Edit Done");


		go_back();
	}



		const on_add = (e)=>{
			e.preventDefault();

				firebase.firestore()
		.collection('tasks')
		.add({...task,timestamp:Date.now()});

		alert("Form Added");


		go_back();
	

			
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
							<p>{task_id ? "Edit Task" : " Add Task"}</p>
						</div>
						

						<div className="task_form_grid">

							<form onSubmit={task_id ? on_submit : on_add}>

								<div className="form_data">

								<div className="edit_task_from_comp">
									<label>Comment</label>
									<textarea type="text" cols="40" required  rows="5" name="comment" value={task.comment} onChange={handleChange} />
								</div>
								
								<div className="edit_task_from_comp">
									<label>Due Date</label>
									<input type="date" name="due_date" required value={task.due_date} onChange={handleChange} />
								</div>
								<div className="edit_task_from_comp">
									<label>Completed Status</label>
									<input type="checkbox" name="status"  checked={task.status} onChange={handleChange} />
								</div>
								<div className="edit_task_from_comp">
									<label>Time</label>
									<input type="time" name="time" required value={task.time} onChange={handleChange} />
								</div>
								<div className="edit_task_from_comp">
									<label>Select User</label>

										{
											!task_id ?
														<select value={task.user} name="user" onChange={handleChange}>
														{
															user_list.map((item)=>(
																<option key={item.key} value={item.key}> {item.email}</option>
															))
															}						
													</select>

											:
											<div className="get_email">
												<GetEmail contact_id={task.user}/>
											</div>

										}
									
								</div>
								<div className="edit_task_from_comp">
									<label>Select Contact Method</label>
										<select value={task.tag}  name ="tag" onChange={handleChange}>
										{
											["","mail","comment","sms","text","call"].map((item)=>(
												<option  selected={"mail" == item } key={item} value={item}> {item}</option>
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

export default EditTask