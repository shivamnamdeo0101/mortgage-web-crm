import React, { useCallback } from "react";
import { withRouter } from "react-router";
import app from "./base";
import { GoogleLogout,GoogleLogin } from 'react-google-login';
import "./login_page.css";
import MainHeadComp from "./routes/comp/MainHeadComp";


const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async response => {

    console.log(response.profileObj);

    const { email, name, imageUrl} = response.profileObj;
    try {
      await  app.auth()
  .createUserWithEmailAndPassword(email,name);

    app.firestore()
      .collection("users")
      .doc(email)
      .set({
        email:email,
        name:name,
        avatar:imageUrl,
        timestamp:Date.now()

      })
  
      history.push("/DashBoard");
    } catch (error) {
      alert(error);
    }
  }, [history]);


  const responseGoogle = (response) => {
  console.log(response);
}
  


  return (

    <div>
   <MainHeadComp />
   <div className="login_page">
      

      <div className="main_login">
      <h1>US Mortgage</h1> 

      <h2>SIGN UP</h2>
        <GoogleLogin
    clientId={'402609478678-laa0oueehe9n0s7bhntahj7a2dvls8v2.apps.googleusercontent.com'}
    onSuccess={handleSignUp}
    onFailure={responseGoogle}
    uxMode={true}
  >
   
    <span> Sign up with Google</span>
  </GoogleLogin>



      <a href="/login">Go back to login page</a>
    

        </div>
    </div>

    </div>
  );
};

export default withRouter(SignUp);
