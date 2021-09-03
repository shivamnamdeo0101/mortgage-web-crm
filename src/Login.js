import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import app from "./base.js";
import { AuthContext } from "./Auth.js";
import { GoogleLogout,GoogleLogin } from 'react-google-login';
import "./login_page.css";
import MainHeadComp from "./routes/comp/MainHeadComp";


const Login = ({ history }) => {
  
    const { currentUser } = useContext(AuthContext);



  const handleLogin = useCallback(
    async response => {
      console.log(response.profileObj);

    const { email, name, } = response.profileObj;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email, name);
        history.push("/DashBoard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );


    const responseGoogle = (response) => {
  console.log(response);
}

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (

    <div className="auth_main">

             <MainHeadComp />
            <div className="login_page">
              
              

                        <div className="main_login">
                        <h1>US Mortgage</h1> 

                        <h2>Log in</h2>


                             <GoogleLogin
                               
                                clientId={'402609478678-laa0oueehe9n0s7bhntahj7a2dvls8v2.apps.googleusercontent.com'}
                                onSuccess={handleLogin}
                                onFailure={responseGoogle}
                              >
                     
                              <span> Login with Google</span>
                            </GoogleLogin>

                            <a href="/signup">Go back to signup page</a>
                          </div>
            </div>

    </div>
  );
};

export default withRouter(Login);


