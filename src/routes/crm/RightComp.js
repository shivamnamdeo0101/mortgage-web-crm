import React,{useState,useEffect} from 'react'
import firebase from "../../base.js";
import moment from "moment";
import {useHistory} from "react-router-dom";

function RightComp({contact_id}) {


		const history = useHistory();
		const [loading, setLoading] = useState(true);
		const [quote_list, set_quote_list] = useState([]);

		const [task_list, set_task_list] = useState([]);
		

		const [filter_task, set_filter_task] = useState(false);


	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('tasks')
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const task_list_ = [];
  
        querySnapshot.forEach(doc => {

        		
        	if((doc.data().user == contact_id) && (doc.data().status == filter_task)){
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
  }, [contact_id,filter_task]); 

  
	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('quotes')
      .orderBy('timestamp','desc')
      .onSnapshot(querySnapshot => {
        
        const quote_list_ = [];
  
        querySnapshot.forEach(doc => {


        		if(doc.data().user == contact_id){
        		quote_list_.push({
        		  	...doc.data(),
          	 		 key: doc.id
        		 });
        	}
        	        		        		 

        });
    
        set_quote_list(quote_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [contact_id]); 


	const route_quote = (id)=>{
		history.push("/edit_quote/"+`${id}`);
	}
	const route_task = (id)=>{
		history.push("/edit_task/"+`${id}`);
	}

	const add_user_task = ()=>{
		history.push("/add_task_user/"+`${contact_id}`);
	}

	return (

		<div className="right_comp">
			<h2>TASKS</h2>
			<div className="task">

				<div className="row_comp">
					<div className="right_head">
						<input type="checkbox" checked={filter_task} onChange={(e)=>set_filter_task(e.target.checked)} />
						<p>Show Completed</p>
					</div>
					<div className="blue_button" onClick={()=>add_user_task()}>
						<p>+ Add Task</p>
					</div>
				</div>


					{
					task_list.map((item)=>(

						<div key={item.key}className="quote_comp" onClick={()=>route_task(item.key)}>
							<h3 style={{color:item.status ? "green" :"#f03" }}>{item.comment}</h3>
							<p>{moment(item.timestamp).fromNow()}</p>
						</div>
					))
				}
				
			</div>


			<h2>QUOTES</h2>
			<div className="quote">

				{
					quote_list.map((item)=>(

						<div key={item.key} className="quote_comp" onClick={()=>route_quote(item.key)}>
							<h3 >{item.quote_comment}</h3>
							<p>{moment(item.timestamp).fromNow()}</p>
						</div>
					))
				}
				
				


			</div>


		</div>
	)
}

export default RightComp