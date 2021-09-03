import React,{useState,useEffect} from 'react'

import firebase from "../../base";

import Loading from "../../Loading";


function GetEmail({contact_id}) {


	const [user, set_user] = useState({});
	useEffect(() => {

    const subscriber = firebase.firestore()
      .collection('contact')
      .doc(contact_id)
      .onSnapshot(doc => {
      	
        set_user({key:doc.id,...doc.data()})
      });
  
    // Unsubscribe from blogs when no longer in use
    return () => subscriber();
  }, [contact_id]); 


if(!user.Email){
	return(
		<div>
			<p>User Not Found</p>
		</div>
	)
}

	return (
		<div>
			<p>{user.Email}</p>
		</div>
	)
}

export default GetEmail