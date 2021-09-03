import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import firebase from "../../base";
import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import {useHistory} from "react-router-dom";
import {lead_source,lead_status,contact_type,country_list,state_list} from "../../ListData";

import "./crm.css";

function EditContact() {

	const {contact_id}  = useParams();
	const history = useHistory();


	const [loading, setLoading] = useState(true);
	const [form, set_form] = useState({});
	function handleChange(evt) {
  		const value =
    		evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  		set_form({
    		...form,
    		[evt.target.name]: value
  		});
	}

	useEffect(() => {

			 const subscriber = firebase.firestore()
      .collection('contact')
      .doc(contact_id)
      .onSnapshot(doc => {
        	

        console.log(contact_id);
        set_form({key:doc.id,...doc.data()});
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
		

   
  }, [contact_id]); 


	const on_submit = (e)=>{
		e.preventDefault();

			firebase.firestore()
		.collection('contact')
		.doc(contact_id)
		.set({...form,timestamp:Date.now()},{merge:true});

		alert("Form Edit Done");


		go_back();
	}



		const on_add = (e)=>{
		e.preventDefault();

			firebase.firestore()
		.collection('contact')
		.add({...form,timestamp:Date.now(),date_created:Date.now()});

		alert("Form Added");


		go_back();
	}

	const go_back = ()=>{
		history.push("/Crm/contacts");
	}


	return (
		<div>
			<div className="dash">
				<Header />
				<div className="dash_board_grid">
					<NavBar />
					<div	className="dash_board_main">

						<div className="route_name">
							<p>Add Contact</p>
						</div>
						

						<div className="task_form_grid">

										<form onSubmit={contact_id ? on_submit : on_add}>
					<div className="user_contact_form">
						
						
						<div className="edit_task_from_comp">
							<label>Full Name</label>	
							<input type="text" name="FullName" required value={form.FullName} onChange={handleChange} />
						</div>

						<div className="edit_task_from_comp">
							<label>Phone Number</label>	
							<input type="text" name="Phone" required value={form.Phone} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Email</label>	
							<input type="email" name="Email" required value={form.Email} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Zipcode</label>	
							<input type="number" name="zipcode" required value={form.zipcode} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Property Type</label>	
							<select value={form.home_type} name="property_type" onChange={handleChange}>
								<option value="Home Purchase" >Home Purchase</option>
								<option value="Refinance">Refinance</option>
								<option value="Cashout">Cashout</option>
							</select>
						</div>
						<div className="edit_task_from_comp">
							<label>Family Type</label>
							<select value={form.home_family_type} name="family_type"onChange={handleChange}>
								<option value="Single Family">Single Family</option>
								<option value="Multifamily">Multifamily</option>
								<option value="Condomonium">Condomonium</option>
								<option value="Townhouse">Townhouse</option>
							</select>
						</div>
						<div className="edit_task_from_comp">
						<label>Home Type</label>
							<select value={form.home_type} name="home_type" onChange={handleChange}>
								<option value="Primary House" >Primary House</option>
								<option value="Secondary Home">Secondary Home</option>
								<option value="Investment Property">Investment Property</option>
							</select>
						</div>



						<div className="edit_task_from_comp">
							<label>Another Phone</label>	
							<input type="number" name="another_phone" value={form.another_phone} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Address 1</label>	
							<input type="text" name="address_one" value={form.address_one} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Address 2</label>	
							<input type="text" name="address_two" value={form.address_two} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>City</label>	
							<input type="text" name="city" value={form.city} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>State</label>	
							<select value={form.state}  required name="state" onChange={handleChange}>
							{
								state_list.map((item)=>(
									<option key={item.key} value={item.slug} >{item.slug}</option>
								))
							}
						</select>
						</div>
							<div className="edit_task_from_comp">
							<label>Country</label>	
							<select value={form.country} name="country" onChange={handleChange}>
							{
								country_list.map((item)=>(
									<option key={item.key} value={item.name} >{item.name}</option>
								))
							}
						</select>
						</div>
							<div className="edit_task_from_comp">
							<label>Lead Status *</label>	
							<select value={form.lead_status} required name="lead_status" onChange={handleChange}>
							{
								lead_status.map((item)=>(
									<option key={item.key} value={item.slug} >{item.val}</option>
								))
							}
						</select>
						</div>
							<div className="edit_task_from_comp">
							<label>Lead Source *</label>	
							<select value={form.lead_source} required name="lead_source" onChange={handleChange}>
							{
								lead_source.map((item)=>(
									<option key={item.key} value={item.slug} >{item.val}</option>
								))
							}
						</select>
						</div>
						<div className="edit_task_from_comp">
							<label>Lead Source URL</label>	
							<input type="text" name="lead_source_url" required value={form.lead_source_url} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Lead Source Referrer</label>	
							<input type="text" name="lead_source_referrer" value={form.lead_source_referrer} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Contact Type *</label>	
							<select value={form.contact_type} required name="contact_type" onChange={handleChange}>
							{
								contact_type.map((item)=>(
									<option key={item.key} value={item.slug} >{item.val}</option>
								))
							}
						</select>
						</div>
						<div className="edit_task_from_comp">
							<label>Comments</label>	
							<input type="text" name="comments"  value={form.comments} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Action Plan</label>	
							<input type="text" name="action_plan" value={form.action_plan} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Price Range</label>	
							<input type="text" name="price_range" value={form.price_range} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Monthly Income</label>	
							<input type="text" name="monthly_income" value={form.monthly_income} onChange={handleChange} />
						</div>

						<div className="edit_task_from_comp">
							<label>Monthly Debt</label>	
							<input type="text" name="monthly_debt" value={form.monthly_debt} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Price Range</label>	
							<input type="text" name="price_range" value={form.price_range} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Is Contacted</label>	
							<input type="checkbox" name="is_contacted" checked={form.is_contacted} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Send New Listings</label>	
							<input type="checkbox" name="send_new_listings" checked={form.send_new_listings} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Loan Purpose</label>	
							<input type="text" name="loan_purpose" value={form.loan_purpose} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Credit Rating</label>	
							<input type="text" name="credit_rating" value={form.credit_rating} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Rate Type</label>	
							<input type="text" name="rate_type" value={form.rate_type} onChange={handleChange} />
						</div>
					
						<div className="edit_task_from_comp">
							<label>Loan Amount</label>	
							<input type="text" name="loan_amount" value={form.loan_amount} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Property Value</label>	
							<input type="text" name="property_value" value={form.property_value} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>First Mortgage Balance</label>	
							<input type="text" name="first_mortgage_balanace" value={form.first_mortgage_balanace} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Second Mortgage Balance</label>	
							<input type="text" name="second_mortgage_balanace" value={form.second_mortgage_balanace} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Cash Out</label>	
							<input type="text" name="cash_out" value={form.cash_out} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>New Home Value</label>	
							<input type="text" name="new_home_value" value={form.new_home_value} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Estimate Down Payment</label>	
							<input type="text" name="estimate_down_payment" value={form.estimate_down_payment} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Property Use</label>	
							<input type="text" name="property_use" value={form.property_use} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Purchase With Agent</label>	
							<input type="text" name="purchase_with_agent" value={form.purchase_with_agent} onChange={handleChange} />
						</div>	
						<div className="edit_task_from_comp">
							<label>Current FHA Loan</label>	
							<input type="text" name="current_fha_loan" value={form.current_fha_loan} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Originated Before</label>	
							<input type="text" name="originated_before" value={form.originated_before} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Signed Contract</label>	
							<input type="checkbox" name="signed_contract" checked={form.signed_contract} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Veteran Military</label>	
							<input type="checkbox" name="veteran_military" checked={form.veteran_military} onChange={handleChange} />
						</div>
							<div className="edit_task_from_comp">
							<label>Found Home</label>	
							<input type="checkbox" name="found_home" checked={form.found_home} onChange={handleChange} />
						</div>
							<div className="edit_task_from_comp">
							<label>Purchase Agreement</label>	
							<input type="checkbox" name="purchase_aggrement" checked={form.purchase_aggrement} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>LTV</label>	
							<input type="text" name="ltv" value={form.ltv} onChange={handleChange} />
						</div>

						<div className="edit_task_from_comp">
							<label>Current VA Loan</label>	
							<input type="text" name="current_va_loan" value={form.current_va_loan} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Age 62 or Older</label>	
							<input type="text" name="age_62_or_older" value={form.age_62_or_older} onChange={handleChange} />
						</div>


						<div className="edit_task_from_comp">
							<label>Year Built</label>	
							<input type="text" name="year_built" value={form.year_built} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Purchase Rate</label>	
							<input type="text" name="purchase_rate" value={form.purchase_rate} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Is Golf Community</label>	
							<input type="checkbox" name="is_gold_community" checked={form.is_gold_community} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Is Gated Community</label>	
							<input type="checkbox" name="is_gated_community" checked={form.is_gated_community} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Equity Range</label>	
							<input type="text" name="equity_range" value={form.equity_range} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Is Senior</label>	
							<input type="checkbox" name="is_senior" checked={form.is_senior} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Is Empty Nester</label>	
							<input type="checkbox" name="is_empty_nester" checked={form.is_empty_nester} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Is Growing Family</label>	
							<input type="checkbox" name="is_growing_family" checked={form.is_growing_family} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Seller Score Range</label>	
							<input type="text" name="seller_score_range" value={form.seller_score_range} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Bankruptcy</label>	
							<input type="checkbox" name="bankruptcy" checked={form.bankruptcy} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Foreclosure</label>	
							<input type="checkbox" name="foreclosure" checked={form.foreclosure} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Forbearance</label>	
							<input type="checkbox" name="forbearance" checked={form.forbearance} onChange={handleChange} />
						</div>
							<div className="edit_task_from_comp">
							<label>Loan Modification</label>	
							<input type="checkbox" name="loan_modification" checked={form.loan_modification} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>Excessive Lates/Derogatories?</label>	
							<input type="text" name="excessive_lates_derogatories" value={form.excessive_lates_derogatories} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>License Number</label>	
							<input type="text" name="license_number" value={form.license_number} onChange={handleChange} />
						</div>


						




					</div>
					
					
					<div className="user_form">
						<div className="edit_task_from_comp">
							<label>Immidiately : Signed a Purchase Aggrement</label>	
							<select value={form.aggrement_type} name="aggrement_type" onChange={handleChange}>
								<option value="Found A House/Officer Pending" >Found A House/Officer Pending</option>
								<option value="Within 30 Days">Within 30 Days</option>
								<option value="2 -3 Months">2 -3 Months</option>
								<option value="3 -6 Months">3 -6 Months</option>
								<option value="6+ Months">6+ Months</option>
								<option value="No Time Frame : I am researching option">No Time Frame : I am researching option</option>
								<option value="2 -3 Months">Cashout</option>
							</select>
						</div>
						<div className="edit_task_from_comp">
							<label>Are you currently employed</label>
							<select value={form.employeement_type} name="employeement_type" onChange={handleChange}>
								<option value=">Full Time">Full Time</option>
								<option value="Part Time">Part Time</option>
								<option value="Self Employeed">Self Employeed</option>
								<option value="No I am not Employed">No I am not Employed</option>
							</select>
						</div>
						<div className="edit_task_from_comp">
							<label>What is estimate purchase price ? </label>	
							<input type="number" name="purchase_price" required value={form.purchase_price} onChange={handleChange} />
						</div>
						<div className="edit_task_from_comp">
							<label>How much are your putting down payment ? </label>	
							<input type="number" name="down_payment" required value={form.down_payment} onChange={handleChange} />
						</div>
						


					</div>
				
					

					<div className="user_form">
						<div className="edit_task_from_comp">
							<button className = "blue_button" type="submit" name="submit">Submit</button>
						</div>
					</div>
				</form>

						</div>

					</div>

				</div>

			</div>
		</div>
	)
}

export default EditContact