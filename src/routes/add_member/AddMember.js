import React,{useState,useEffect} from 'react';

import firebase from "../../base.js";

import {useParams,useHistory} from "react-router-dom";

import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import "../comp/comp.css";
import moment from "moment";

function AddMember() {


	const [user_list, set_user_list] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('users')
      .orderBy('name','desc')
      .onSnapshot(querySnapshot => {
        
        const user_list_ = [];
  
        querySnapshot.forEach(doc => {
               	user_list_.push({
        		  	...doc.data(),
          	 		 key: doc.id
        		 });
        	

        	
        	
        		        		 

        });
    		

        set_user_list(user_list_);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [user_list]); 

	return (
		<div className="dash">
				<Header />
				<div className="dash_board_grid">
					<NavBar />
					<div	className="dash_board_main">


						<div className="dash_menu_data">

							<div className="route_name">
								<p>Team Members</p>
							</div>

						</div>


						<div className="member_list">
							
							{
								user_list.map((item)=>(

									<div className="member" key={item.key}>
										<img src={item.avatar} alt="img"/>
										<h3>{item.name}</h3>
										<p>Joined On {moment(item.ads_no).format("LLL")}</p>
									</div>
								))
							}


						</div>

					</div>

				</div>
			
		</div>
	)
}

export default AddMember