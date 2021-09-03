import React,{useState,useEffect} from 'react';
import firebase from "../../base.js";
import {useParams,useHistory} from "react-router-dom";
import DashboardIcon from '@material-ui/icons/Dashboard';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import ListAltIcon from '@material-ui/icons/ListAlt';
import GroupIcon from '@material-ui/icons/Group';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import "../comp/comp.css";
import {state_list} from "../../ListData";

function ProfileComp() {

	  let { route } = useParams();

	  const history  = useHistory();


	  const [loading, setLoading] = useState(true);
	  const [user_data, set_user_data] = useState({});
	 

	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .onSnapshot(doc => {
        
       	set_user_data({key:doc.id,...doc.data()});
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, []); 


	









	 const make_route = (val)=>{
		history.push(`${val}`);
	}


	function handleChange(evt) {
  		const value =
    		evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  		set_user_data({
    		...user_data,
    		[evt.target.name]: value
  		});
	}


	const on_submit = (e)=>{
		e.preventDefault()
		firebase.firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .set({...user_data,timestamp:Date.now()});

      alert("Profile Updated");
	}

	return (
		<div className="dash_profile">

			<div className="dash_profile_main">
				
				<div className="profile_form">

					<form className="profile_form_grid"  onSubmit={on_submit}>
					<div className="profile_form_comp">
						<label>Profile Image</label>
						<img src={user_data.avatar} alt=""/>
					</div>
					<div className="profile_form_comp">
						<label>Email</label>
						<input type="text" disabled value={user_data.email} name="email" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>First Name</label>
						<input type="text" value={user_data.first_name} name="first_name" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Last Name</label>
						<input type="text" value={user_data.last_name} name="last_name" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Address 1</label>
						<input type="text"  value={user_data.address_one} name="address_one" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>City</label>
						<input type="text"  value={user_data.city} name="city" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>State</label>
						<select value={user_data.state}  required name="state" onChange={handleChange}>
							{
								state_list.map((item)=>(
									<option key={item.key} value={item.slug} >{item.slug}</option>
								))
							}
						</select>
					</div>
					<div className="profile_form_comp">
						<label>Zipcode</label>
						<input type="text" value={user_data.zipcode} name="zipcode" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>License Type</label>
						<input type="text" value={user_data.license_type} name="license_type" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>License ID</label>
						<input type="text" value={user_data.license_id} name="license_id" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Language Spoken</label>
						<input type="text" value={user_data.language_spoeken} name="language_spoeken" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Bio</label>
						<textarea type="text" rows="10" value={user_data.bio} name="bio" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Facebook URL</label>
						<input type="text" value={user_data.facebook_url} name="facebook_url" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Youtube URL</label>
						<input type="text" value={user_data.youtube_url} name="youtube_url" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Instagram URL</label>
						<input type="text" value={user_data.intagram_url} name="intagram_url" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Linkedin URL</label>
						<input type="text" value={user_data.linkedin_url} name="linkedin_url" onChange={handleChange}/>
					</div>
					<div className="profile_form_comp">
						<label>Twitter URL</label>
						<input type="text" value={user_data.twitter_url} name="twitter_url" onChange={handleChange}/>
					</div>


						<div className="profile_form_comp">
						 
						<button className="blue_button" type="submit">Submit</button>
					</div>
					</form>
				</div>
			</div>	


		</div>
	)
}

export default ProfileComp