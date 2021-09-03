import React,{useState,useEffect} from 'react';
import firebase from "../../base";
import {useHistory} from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CallIcon from '@material-ui/icons/Call';
import MailIcon from '@material-ui/icons/Mail';
import HomeIcon from '@material-ui/icons/Home';
function ProfileComp({contact_id}) {

	const [form, set_form] = useState({});
	const [loading, setLoading] = useState(true);
	const history = useHistory();
	useEffect(() => {

		if(contact_id){
			 const subscriber = firebase.firestore()
      .collection('contact')
      .doc(contact_id)
      .onSnapshot(doc => {
        
        set_form({key:doc.id,...doc.data()});
        setLoading(false);
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
		}

   
  }, [contact_id]); 


	return (
		<div>
			<div className="comp_head ">
				
				<div className="profile_header">
					<div className="profile_header_comp">
						<h1>{form.FullName}</h1>
					</div>

					<IconButton onClick={()=>history.push("/edit_contact/"+`${contact_id}`)}>
						<EditIcon style={{color:"#474a94"}}/>
					</IconButton>

				</div>

				<div className="profile_header_data">
					<div className="profile_header_data_comp">
						<CallIcon />
						<p>{form.Phone}</p>
					</div>
					<div className="profile_header_data_comp">
						<MailIcon />
						<p>{form.Email}</p>
					</div>
					<div className="profile_header_data_comp">
						<HomeIcon />
						<p>{form.address_one}</p>
					</div>
				</div>

			<div className="comp_main ">

			
				<div className="profile_comp">
					<h3>Another Phone</h3>
					<p>{form.another_phone}</p>
				</div>
				<div className="profile_comp">
					<h3>Address 1</h3>
					<p>{form.address_one}</p>
				</div>
				<div className="profile_comp">
					<h3>Address 2</h3>
					<p>{form.address_two}</p>
				</div>
				<div className="profile_comp">
					<h3>City</h3>
					<p>{form.city}</p>
				</div>
				<div className="profile_comp">
					<h3>State</h3>
					<p>{form.state}</p>
				</div>
				<div className="profile_comp">
					<h3>Zipcode</h3>
					<p>{form.zipcode}</p>
				</div>
				<div className="profile_comp">
					<h3>Country</h3>
					<p>{form.country}</p>
				</div>
				<div className="profile_comp">
					<h3>Lead Status</h3>
					<p>{form.lead_status}</p>
				</div>
				<div className="profile_comp">
					<h3>Lead Source</h3>
					<p>{form.lead_source}</p>
				</div>
				<div className="profile_comp">
					<h3>Lead Source URL</h3>
					<p><a href={form.lead_source_url}>Link</a></p>
				</div>
				<div className="profile_comp">
					<h3>Lead Source Referrer</h3>
					<p>{form.lead_source_referrer}</p>
				</div>
				<div className="profile_comp">
					<h3>Contact Type</h3>
					<p>{form.contact_type}</p>
				</div>
				<div className="profile_comp">
					<h3>Comments</h3>
					<p>{form.commments}</p>
				</div>
				<div className="profile_comp">
					<h3>Action Plan</h3>
					<p>{form.action_plan}</p>
				</div>
				<div className="profile_comp">
					<h3>Price Range</h3>
					<p>{form.price_range}</p>
				</div>
				<div className="profile_comp">
					<h3>Monthly Income</h3>
					<p>{form.monthly_income}</p>
				</div>
				<div className="profile_comp">
					<h3> Monthly Debt</h3>
					<p>{form.monthly_debt}</p>
				</div>
				<div className="profile_comp">
					<h3>Is Contacted</h3>
					<p>{form.is_contacted ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Send New Listings</h3>
					<p>{form.send_new_listings ? "Yes" : "No"}</p>
				</div><div className="profile_comp">
					<h3>Loan Purpose</h3>
					<p>{form.loan_purpose}</p>
				</div>
				<div className="profile_comp">
					<h3>Property Type</h3>
					<p>{form.property_type}</p>
				</div>
				<div className="profile_comp">
					<h3>Credit Rating</h3>
					<p>{form.credit_rating}</p>
				</div>
				<div className="profile_comp">
					<h3>Rate Type</h3>
					<p>{form.rate_type}</p>
				</div>
				<div className="profile_comp">
					<h3>Cash Out</h3>
					<p>{form.cash_out}</p>
				</div>
				<div className="profile_comp">
					<h3>Loan Amount</h3>
					<p>{form.loan_amount}</p>
				</div>
				<div className="profile_comp">
					<h3>Property Value</h3>
					<p>{form.property_value}</p>
				</div>
				<div className="profile_comp">
					<h3>First Mortgage Balance</h3>
					<p>{form.first_mortgage_balance}</p>
				</div>
				<div className="profile_comp">
					<h3>Second Mortgage Balance</h3>
					<p>{form.second_mortgage_balance}</p>
				</div>
				<div className="profile_comp">
					<h3>New Home Value</h3>
					<p>{form.new_home_value}</p>
				</div>
				<div className="profile_comp">
					<h3>Estimate Down Payment</h3>
					<p>{form.estimate_down_payment}</p>
				</div>
				<div className="profile_comp">
					<h3>Property Use</h3>
					<p>{form.property_use}</p>
				</div>
				<div className="profile_comp">
					<h3>Purchase With Agent</h3>
					<p>{form.purchase_with_agent}</p>
				</div>
				<div className="profile_comp">
					<h3>Current FHA Loan</h3>
					<p>{form.current_fha_loan}</p>
				</div>
				<div className="profile_comp">
					<h3>Originated Before</h3>
					<p>{form.originated_before}</p>
				</div>
				<div className="profile_comp">
					<h3>Signed Contract</h3>
					<p>{form.signed_contract  ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Veteran Military</h3>
					<p>{form.veteran_military ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Found Home</h3>
					<p>{form.found_home ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Purchase Agreement</h3>
					<p>{form.purchase_aggrement ? "Yes" : "No"}</p>
				</div>

				<div className="profile_comp">
					<h3>LTV</h3>
					<p>{form.ltv}</p>
				</div>
				<div className="profile_comp">
					<h3>Current VA Loan</h3>
					<p>{form.current_va_loan}</p>
				</div>
				<div className="profile_comp">
					<h3>Age 62 or Older</h3>
					<p>{form.age_62_or_older}</p>
				</div>
				<div className="profile_comp">
					<h3>Year Built</h3>
					<p>{form.year_built}</p>
				</div>
				<div className="profile_comp">
					<h3>Purchase Rate</h3>
					<p>{form.purchase_rate}</p>
				</div>
				<div className="profile_comp">
					<h3>Is Golf Community</h3>
					<p>{form.is_golf_community ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Is Gated Community</h3>
					<p>{form.is_gated_community ? "Yes":"No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Equity Range</h3>
					<p>{form.equity_range}</p>
				</div>
				<div className="profile_comp">
					<h3>Is Senior</h3>
					<p>{form.is_senior ? "Yes" :" No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Is Empty Nester</h3>
					<p>{form.is_empty_nester ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Is Growing Family</h3>
					<p>{form.is_growing_family ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Seller Score Range</h3>
					<p>{form.seller_score_range}</p>
				</div>
				<div className="profile_comp">
					<h3>Bankruptcy</h3>
					<p>{form.bankruptcy ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Foreclosure</h3>
					<p>{form.foreclosure ?"Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Loan Modification</h3>
					<p>{form.loan_modification ? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>Excessive Lates/Derogatories?</h3>
					<p>{form.excessive_lates_derogatories? "Yes" : "No"}</p>
				</div>
				<div className="profile_comp">
					<h3>License Number</h3>
					<p>{form.license_number}</p>
				</div>
				



			</div>
		</div>
		</div>
	)
}

export default ProfileComp