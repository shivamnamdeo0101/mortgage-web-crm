import React,{useState,useEffect} from 'react';
import {useParams} from "react-router-dom";
import firebase from "../../base";
import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import {useHistory} from "react-router-dom";
import {contact_type,process_status_list,quote_status_list,state_list} from "../../ListData";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Checkbox from '@material-ui/core/Checkbox';
import GetEmail  from "./GetEmail";
import moment from "moment";
import emailjs from 'emailjs-com';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import VisibilityIcon from '@material-ui/icons/Visibility';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

import ListAltIcon from '@material-ui/icons/ListAlt';
import SendIcon from '@material-ui/icons/Send';


import RecentActorsIcon from '@material-ui/icons/RecentActors';
import "./crm.css";

function EditQuote() {

	const {quote_id}  = useParams();

	const history = useHistory();
	const [deal, set_deal] = useState("");


	const [rate_table, set_rate_table] = useState("");

	const [user, set_user] = useState({});

	const [comp_val, set_comp_val] = useState("loan");

	const [checked, setChecked] = React.useState(true);

	const [last_send_quote, set_last_send_quote] = useState(0);

	const [loading, setLoading] = useState(true);
	const [quote, set_quote] = useState({});

	const [milestone, set_milestone] = useState(quote.milestone);

	const [user_list, set_user_list] = useState([]);


	function handleChange(evt) {
  		const value =
    		evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
  		set_quote({
    		...quote,
    		[evt.target.name]: value
  		});
	}









			useEffect(() => {

    const subscriber = firebase.firestore()
          .collection('contact')
      .orderBy('Email','desc')
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
  }, []); 

	useEffect(() => {

			 const subscriber = firebase.firestore()
      .collection('quotes')
      .doc(quote_id)
      .onSnapshot(doc => {
        	
        set_quote({key:doc.id,...doc.data()});
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
		

   
  }, [quote_id]); 


	useEffect(() => {

		if(quote_id){
			 const subscriber = firebase.firestore()
      .collection('contact')
      .doc(quote.user)
      .onSnapshot(doc => {
        	
        set_user({key:doc.id,...doc.data()});

        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
		}
			
		

   
  }, [quote_id]); 



	const on_submit = (e)=>{
		e.preventDefault();

			firebase.firestore()
		.collection('quotes')
		.doc(quote.key)
		.set({...quote,timestamp:Date.now()},{merge:true});

		alert("Quote Edit Done");


		go_back();
	}



	const on_add = (e)=>{
		e.preventDefault();

			firebase.firestore()
		.collection('quotes')
		.add({...quote,timestamp:Date.now(),date_created:Date.now()});

		alert("Quote Added");


		go_back();
	}

	const on_duplicate = ()=>{

			firebase.firestore()
		.collection('quotes')
		.add({...quote,timestamp:Date.now(),date_created:Date.now()});

		alert("Quote Duplicated");


		go_back();
	}


	const go_back = ()=>{
		history.push("/Crm/quotes");
	}



	const add_quote = ()=>{
		history.push("/add_quote");
	}


	const handleChecked = (val) => {
    		set_quote({...quote,milestone:val});

  };


  const send_quote = ()=>{



		var templateParams ={
		    to_name:user.Email,
		    phone:user.Phone,
		    from_name:"aryansn0101@gmail.com",
				loan_amount:quote.loan_amount,
				name:user.FullName,
				property_address:quote.property_address,
				estimated_close_date:quote.estimated_close_date,
				fico_score:quote.fico_score,
				loan_type:quote.loan_type,
				occupancy:quote.occupancy,
				term_years:quote.term_years,
		};
 
		emailjs.send('service_hv2jtqn', 'template_yrma8m7', templateParams,"user_x9vAOPZv8OKN2EnsDJWAF")
    .then(function(response) {


       console.log('SUCCESS!', response.status, response.text);
       set_last_send_quote(Date.now());
       set_quote({last_send_quote,...quote});

       alert("Quote Sent ")
    }, function(error) {
       console.log('FAILED...', error);
    });
	}


	function excelToObjects(stringData){

  	
  	var rows = stringData.split("\n");

		var table = [];

		for(var y in rows) {
		    var cells = rows[y].split("\t");
		    var row = [];
		    for(var x in cells) {
		        row.push(cells[x]);
		    }
		    table.push(row);
		}

		console.log(table);

		

		set_quote({...quote,quote_rate_table:stringData});

   
}



	return (
		<div>
			<div className="dash">
				<Header />
				<div className="dash_board_grid">
					<NavBar />
					<div className="dash_board_main">

						<div className="route_name">
							<p>{quote_id ? "Edit Quote" : "Add Quote"}</p>
						</div>
						


						<div className="bg_white">

							
							{
								last_send_quote ?
								<div className="grid_quote_head">
								<h3>Last Quote Sent </h3>
								<p>{moment(last_send_quote).format("LLL")}</p>
							</div>
							:

							<div>
							</div>
							}
							
							{
								quote_id ? 
									<div className="grid_quote_head">
								<h3>Contact </h3>
								<p><GetEmail contact_id={quote.user}/></p>
							</div>
							:
							<div>
							</div>
							}
						
							<div className="grid_quote_head">
								<h3>Mortgage Deal </h3>
								<select value={deal} onChange={(e)=>set_deal(e.target.value)}>
									{
										contact_type.map((item)=>(
											<option key={item.key} value={item.data} >{item.val}</option>
										))
									}
									
									
								</select>
							</div>


							
							<div className="quote_milestone_list margin_top">
								<h3>Milestone </h3>
								<div className="quote_milestone_list">


									{
										contact_type.map((item,index=0)=>(

											<div key={item.key} className="quote_milestone_list"
											>
												<Tooltip title={item.val} arrow>
										
													<Checkbox
																icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />}
												        checked={(quote.milestone >= index || quote.milestone == 14)}
												        onChange={()=>handleChecked(index)}
												        color="primary"
												      />
													
												</Tooltip>
												<p>=></p>
											</div>

										))
									}

									

									
									<Tooltip title="Need Changes" arrow>
									
										<Checkbox

													icon={<RadioButtonUncheckedIcon />} checkedIcon={<CheckCircleIcon />}
									        checked={quote.milestone == 14}
													onChange={()=>handleChecked(14)}
									        color="primary"
									      />
									
									</Tooltip>
									
									
								</div>

							</div>


								<div className="quote_action_list">


									{
										quote_id &&
											<div className="action_button" onClick={()=>add_quote()}>
												<AddCircleOutlineIcon />
												<p>New</p>
											</div>
									}

								
								
									<div className="action_button" onClick={()=>on_duplicate()}>
										<FileCopyIcon />
										<p>Duplicate</p>
									</div>
									<div className="action_button" onClick={()=>history.push("/view_quote/"+`${quote.key}`)}>
										<VisibilityIcon />
										<p>Preview</p>
									</div>
									<div className="action_button" onClick={()=>history.push("/view_contact/"+`${quote.user}`)}>
										<PermContactCalendarIcon />
										<p>Contact</p>
									</div>
									<div className="action_button" onClick={()=>history.push("/add_task_user/"+`${quote.user}`)}>
										<ListAltIcon />
										<p>Task</p>
									</div>
									<div className="action_button" onClick={()=>send_quote()}>
										<SendIcon />
										<p>Send Quote</p>
									</div>
									<div className="action_button" onClick={()=>window.open("https://app.floify.com/","blank")}>
										<RecentActorsIcon />
										<p>Start Floify</p>
									</div>
									

								</div>
							

							<div className="crm_switch_screen">

								<div className={comp_val == "loan" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("loan")}>
									<p>Loan</p>
								</div>
								<div className={comp_val == "property" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("property")}>
									<p>Property</p>
								</div>
								<div className={comp_val == "heloc" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("heloc")}>
									<p>Heloc</p>
								</div>
								<div className={comp_val == "status" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("status")}>
									<p>Status</p>
								</div>
								<div className={comp_val == "realtor" ? " crm_switch_comp crm_switch_comp_hover" : "crm_switch_comp" } onClick={()=>set_comp_val("realtor")}>
									<p>Realtor</p>
								</div>
										
							</div>


							






							<form   id="quote_form" onSubmit={quote_id ? on_submit : on_add}>

								{
									comp_val == "loan" &&
									<div className="grid_form_main">

										<div className="grid_form_head">
											<h2>Loan Info</h2>
											<div className="quote_form_comp">
												<div className="quote_form_comp_input">
												<label>Loan Purchase</label>
												<input type="text" name="loan_purchase" value={quote.loan_purchase} onChange={handleChange}/>
														

												</div>
												<div className="quote_form_comp_input">
														<label>Quote Purpose</label>
														<input type="text" name="quote_purpose" value={quote.quote_purpose} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Loan Amount</label>
														<input type="text" name="loan_amount" value={quote.loan_amount} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Down Payment</label>
														<input type="text" name="down_payment" value={quote.down_payment} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>LTV</label>
														<input type="text" name="ltv" value={quote.ltv} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Loan Type</label>
														<input type="text" name="loan_type" value={quote.loan_type} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Occupancy</label>
														<input type="text" name="occupancy" value={quote.occupancy} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Property Type</label>
														<input type="text" name="property_type" value={quote.property_type} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Term (Years)</label>
														<input type="text" name="term_years" value={quote.term_years} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Rate Requested</label>
														<input type="text" name="rate_requested" value={quote.rate_requested} onChange={handleChange}/>
												</div>

											</div>

										</div>




										
										<div className="grid_form_head">
											<h2>Borrower</h2>
											<div className="quote_form_comp">
												<div className="quote_form_comp_input">
														<label>FICO Score</label>
														<input type="text" name="fico_score" value={quote.fico_score} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Income Verification</label>
														<input type="text" name="income_verification" value={quote.income_verification} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>State</label>
														<input type="text" name="state" value={quote.state} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Country</label>
														<input type="text" name="county" value={quote.county} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Buyer Name (LLC/Name)</label>
														<input type="text" name="buyer_name" value={quote.buyer_name} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Property Address</label>
														<input type="text" name="property_address" value={quote.property_address} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>City</label>
														<input type="text" name="city" value={quote.city} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Property Zip_Code</label>
														<input type="text" name="property_zip_code" value={quote.property_zip_code} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>No Of Units</label>
														<input type="text" name="no_of_units" value={quote.no_of_units} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>No Of Stories</label>
														<input type="text" name="no_of_stories" value={quote.no_of_stories} onChange={handleChange}/>
												</div>


											</div>

										</div>

										<div className="grid_form_head">
											<h2>Fees</h2>
											<div className="quote_form_comp">
												<div className="quote_form_comp_input">
														<label>Lender</label>
														<input type="text" name="lender" value={quote.lender} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Lender Product</label>
														<input type="text" name="lender_product" value={quote.lender_product} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Fee Type</label>
														<input type="text" name="fee_type" value={quote.fee_type} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Estimated Origination Fee</label>
														<input type="text" name="estimated_org_fee" value={quote.estimated_org_fee} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Lender Fees</label>
														<input type="text" name="lender_fees" value={quote.lender_fees} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Processing Fee</label>
														<input type="text" name="processing_fees" value={quote.processing_fees} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Appraisal Fee</label>
														<input type="text" name="appraisal_fees" value={quote.appraisal_fees} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>	Taxes & Recording Fees</label>
														<input type="text" name="taxes_and_recording_fee" value={quote.taxes_and_recording_fee} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>PMI (monthly)</label>
														<input type="text" name="pmi_monthly" value={quote.pmi_monthly} onChange={handleChange}/>
												</div>

												<div className="quote_form_comp_input">
														<label>Use Escrow?</label>
														<input type="checkbox" name="use_escrow" checked={quote.use_escrow} onChange={handleChange}/>
												</div>
											
											</div>

										</div>
										<div className="grid_form_head">
											<h2>Quote Info</h2>
											<div className="quote_form_comp">
												<div className="quote_form_comp_input">
												<label>Select User</label>

												{
													!quote_id ? 
												
														<select value={quote.user} name="user" onChange={handleChange}>
											
														{ 
														user_list.map((item)=>(
																<option  key={item.key} value={item.key}> {item.Email}</option>
														))}

														</select>

														:

																<div className="get_email">
																	<GetEmail contact_id={quote.user}/>
																</div>

												}

												</div>
												<div className="quote_form_comp_input">
														<label>Quote Name</label>
														<input type="text" name="quote_name" value={quote.quote_name} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Quote Rate Table</label>
														<textarea type="text" rows="15" name="quote_rate_table" 

															value= {quote.quote_rate_table}


														 onChange={(e)=>excelToObjects(e.target.value)}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Quote Comment</label>
														<textarea type="text" rows="15" name="quote_comment" value={quote.quote_commant} onChange={handleChange}/>
												</div>
											</div>

										</div>


									</div>	
								}


								{
									comp_val == "heloc" &&
									<div className="grid_form_head">
											<h2>Heloc</h2>
											<div className="quote_form_comp">

												<div className="quote_form_comp_input">
														<label>Add HELOC?</label>
														<input type="text" name="add_heloc" value={quote.add_heloc} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>HELOC Amount</label>
														<input type="text" name="heloc_amount" value={quote.heloc_amount} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>HELOC Draw</label>
														<input type="text" name="heloc_draw" value={quote.heloc_draw} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>HELOC Rate</label>
														<input type="text" name="heloc_rate" value={quote.heloc_rate} onChange={handleChange}/>
												</div>
											</div>

									</div>
								}

								{
									comp_val == "status" &&
									<div className="grid_form_head">
											<h2>Status</h2>
											<div className="quote_form_comp">

													<div className="quote_form_comp_input">
														<label>Status</label>
														<select value={quote.quote_status} name="quote_status" onChange={handleChange}>
														{
															quote_status_list.map((item)=>(
																<option key={item.key} value={item.data} >{item.val}</option>
															))
														}														
													</select>
												</div>
												<div className="quote_form_comp_input">
														<label>Process Status</label>
														<select value={quote.process_status} name="process_status" onChange={handleChange}>
														{
															process_status_list.map((item)=>(
																<option key={item.key} value={item.data} >{item.val}</option>
															))
														}														
													</select>
												</div>
												<div className="quote_form_comp_input">
														<label>Stage/Milestone</label>
														<input type="text" name="heloc_amount" value={quote.heloc_amount} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Email Template</label>
														<input type="text" name="heloc_template" value={quote.heloc_template} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Response</label>
														<input type="text" name="response" value={quote.response} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Estimated Closing Date</label>
														<input type="text" name="estimated_close_date" value={quote.estimated_close_date} onChange={handleChange}/>
												</div>

											</div>

									</div>
								}
								{
									comp_val == "property" &&
									<div className="grid_form_head">
											<h2>Property</h2>
											<div className="quote_form_comp">

												<div className="quote_form_comp_input">
														<label>Zipcode</label>
														<input type="text" name="zipcode" value={quote.zipcode} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Property Taxes ( Yearly)</label>
														<input type="text" name="property_tax" value={quote.property_tax} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Insurance (Yearly)</label>
														<input type="text" name="insurance_yearly" value={quote.insurance_yearly} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>HDA Fees (Monthly)</label>
														<input type="text" name="hda_fees_monthly" value={quote.hda_fees_monthly} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Current Interest Rate</label>
														<input type="text" name="current_interest_rate" value={quote.current_interest_rate} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Current Balance</label>
														<input type="text" name="current_balance" value={quote.current_balance} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Current Payment</label>
														<input type="text" name="current_payment" value={quote.current_payment} onChange={handleChange}/>
												</div>
											</div>

									</div>
								}
								{
									comp_val == "realtor" &&
									<div className="grid_form_head">
											<h2>Add Realtor</h2>
											<div className="quote_form_comp">

												<div className="quote_form_comp_input">
														<label>First Name</label>
														<input type="text" name="realtor_first_name" value={quote.realtor_first_name} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Last Name</label>
														<input type="text" name="realtor_last_name" value={quote.realtor_last_name} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Email</label>
														<input type="text" name="realtor_email" value={quote.realtor_email} onChange={handleChange}/>
												</div>
												<div className="quote_form_comp_input">
														<label>Phone</label>
														<input type="number" name="realtor_phone" value={quote.realtor_phone} onChange={handleChange}/>
												</div>
												
												<div className="quote_form_comp_input">
														<label>License No</label>
														<input type="text" name="realtor_license_no" value={quote.realtor_license_no} onChange={handleChange}/>
												</div>
												
											</div>

									</div>
								}



								<div className="user_form">
									<div className="quote_form_comp_input">
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

export default EditQuote