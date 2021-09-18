import React,{useState,useEffect} from 'react';
import Header from "../comp/Header";
import NavBar from "../comp/NavBar";
import "../comp/comp.css";
import ProfileComp from "./ProfileComp";
import firebase from "../../base";
import {useParams} from "react-router-dom";
import {useHistory} from "react-router-dom";
import moment from "moment";
import Tooltip from '@material-ui/core/Tooltip';
import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function ViewQuote() {

	const {quote_id}  = useParams();
	const history = useHistory();

	const [loading, setLoading] = useState(true);
	const [quote, set_quote] = useState({});
	const [user, set_user] = useState({});
	const [rate_table, set_rate_table] = useState("");

	useEffect(() => {
		if(quote_id){

			 const subscriber = firebase.firestore()
      .collection('quotes')
      .doc(quote_id)
      .onSnapshot(doc => {
        	
        set_quote({key:doc.id,...doc.data()});
        set_rate_table(doc.data().quote_rate_table);
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();

	}
		

   
  }, [quote_id]); 


	useEffect(() => {

		if(quote){
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
			
		

   
  }, [quote]); 



	const TableCreate = ()=>{

		const data = rate_table;

		var rows = data.split("\n");

		var table =[];

		for(var y in rows) {
		    var cells = rows[y].split("\t");
		    var row = [];
		    for(var x in cells) {
		        row.push(cells[x]);
		    }
		    table.push(row);
		}

		return table;
		
	}



	return (
		<div className="dash">
				<Header />
				<div >
					<div className="view_quote ">
						<div className="view_quote_head">
							<h1>New {user.FullName} Reference Test Quote 7/13/21</h1>
							<h2>Estimated Fee Work Sheet *</h2>
							<p>This is not an official loan estimate, You have not submitted the loan application yet.</p>
						</div>
					</div>

					<div className="view_quote_cmt view_quote">

						<p>
							Hi {user.FullName} <br/>

							I gave you a choices in case you want to buy down the rate, you have a option to get a lender credit 
							towards closing costs, or you can buy the rate down.
						</p>

						

						<h2>Loan Amount : {quote.loan_amount}</h2>
						<h2>Rate Choice</h2>


					</div>


					<div className="rate_table">
													
													{
														quote.quote_rate_table !=null ?
													
													<table>
													    <th>Rate</th>
													    <th>APR</th>
													    <th>Price</th>
													     <th>Discount/Rebate</th>
													     <th>Discount/Rebate</th>
													     <th>Lender Fees</th>
													     <th>P & I </th>
													     <th>Total Payment </th>

													  <tbody>
														{
															TableCreate(quote.quote_rate_table).map((rows,i=0)=>(
																			


																		  <tr key={rows}>
																		    {
																					rows.map((cols,index=0)=>(


																								  <td>{rows[index]}</td>
																								  																								  
																							))
																					}

																		  </tr>
																		  
																	))
															}
														</tbody>
													</table>
													:

													<div>
													</div>
													}

					</div>

					<div className="view_quote_start view_quote">
						<h2>THIS WORKS! START MY LOAN APPLICATION</h2>
					</div>


					






						<div className="view_quote_grid">

							<div className="view_quote_comp">
										<h2>YOUR OUTSIDE MORTGAGE LOAN ORIGINATOR</h2>

										<div	className="realtor_profile">
											<AccountCircleIcon />

											<div className="realtor_bio">
												<h1>{user.FullName}</h1>
												<h2>NMLS#  : {user.Phone}</h2>
												<div>
													<IconButton>
														<CallIcon />
													</IconButton>
													<IconButton>
														<EmailIcon />
													</IconButton>
												</div>
											</div>
										</div>
							</div>
								<div className="view_quote_comp">
										<h2>YOUR RECOMMENDED REALTOR</h2>

										<div	className="realtor_profile">
											<AccountCircleIcon />

											<div className="realtor_bio">
												<h1>Your Realtor</h1>
												<h2>Agent License No : #{quote.realtor_license_no}</h2>
												<div>
													<IconButton>
														<CallIcon />
													</IconButton>
													<IconButton>
														<EmailIcon />
													</IconButton>
												</div>
											</div>
										</div>
								</div>

						</div>


						<div className="view_quote_data_grid">
							<div className="view_quote_data_comp">
								<h1>Subject Property</h1>
								<div className="view_quote_comp_row">	
									<h3>Property Address</h3>	
									<p>{quote.property_address}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>City</h3>	
									<p>{quote.property_address}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>County</h3>	
									<p>{quote.property_address}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Appraised Value</h3>	
									<p>{quote.property_address}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Zestimate</h3>	
									<p>{quote.zestimate}</p>
								</div>


							</div>
							<div className="view_quote_data_comp">
								<h1>Proposed Loan</h1>
								<div className="view_quote_comp_row">	
									<h3>Loan Purpose</h3>	
									<p>{quote.loan_purpose}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Loan Type</h3>	
									<p>{quote.loan_type}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Occupancy</h3>	
									<p>{quote.occupancy}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Loan Amount</h3>	
									<p>{quote.loan_amount}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Property Taxes (Yearly)</h3>	
									<p>{quote.property_taxes}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Insurance (Yearly)</h3>	
									<p>{quote.insurance_yearly}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>HOA Fees (Monthly)</h3>	
									<p>{quote.hda_fees}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Terms (Years)</h3>	
									<p>{quote.term}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>FICO Score</h3>	
									<p>{quote.fico_score}</p>
								</div>

							</div>
							<div className="view_quote_data_comp">
								<h1>Estimated Closing Fees</h1>
								<div className="view_quote_comp_row">	
									<h3>Lender Underwriting Fee</h3>	
									<p>{quote.lender_fees}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Processing Fees</h3>	
									<p>{quote.property_address}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Appraisal (Varies By State)</h3>	
									<p>{quote.property_address}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Title Fees</h3>	
									<p>{quote.property_address}</p>
								</div>
								<div className="view_quote_comp_row">	
									<h3>Taxes & Recording Fees</h3>	
									<p>{quote.taxes_and_recording_fee}</p>
								</div>


							</div>



						</div>


							<div className="margin_bottom view_quote">
							<p>
								License. Subject to these Terms of Service, we grant each user of the Services a non-exclusive, non-sublicensable, 
								and non-transferable license to access and use the Services and access, download, and display locally, all Content 
								therein for your personal, non-commercial purposes. Any reproduction, modification, distribution, storage, or other 
								use of the Services, or any Content therein for any other purpose, is expressly prohibited without prior written permission
								 from us. You shall not sell, license, rent, share, publish, or otherwise use or exploit any Content outside the Services for 
								 commercial use, in connection with the provision of services to a third party, or in any way that violates any third party 
								 . Without limiting the foregoing, no real estate broker, salesperson, agent, or similar state licensed real estate professional
								  may market or make commercial use of the Content in any way, including, without limitation, advertising our property listings, 
								  copying our Content forcommercial use, or contacting our customers or the owners or sellers of any properties listed on the Services.
							</p>
						</div>



				</div>
			
		</div>
	)
}

export default ViewQuote