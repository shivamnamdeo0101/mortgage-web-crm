import React,{useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";
import SendIcon from '@material-ui/icons/Send';
import {useParams} from "react-router-dom";
import firebase from "../../base";
import emailjs from 'emailjs-com';


function SendQuote({quote}) {

	const [user, set_user] = useState({});

	useEffect(() => {

			 const subscriber = firebase.firestore()
      .collection('contact')
      .doc(quote.user)
      .onSnapshot(doc => {
        set_user({key:doc.id,...doc.data()});
      });
  

    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
			
		

   
  }, [quote]); 

	

	const send_quote = ()=>{



		var templateParams ={
		    to_name:quote.user_email,
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
       on_send_quote();

       
    }, function(error) {
       console.log('FAILED...', error);
    });
	}




  const on_send_quote = ()=>{
			firebase.firestore()
		.collection('quotes')
		.doc(quote.key)
		.set({last_send_quote:Date.now()},{merge:true});

			alert("Quote Sent ");
	}


	return (
		<div>
			<div className="action_button" onClick={()=>send_quote()}>
				<SendIcon />
				<p>Send Quote</p>
			</div>
		</div>
	)
}

export default SendQuote