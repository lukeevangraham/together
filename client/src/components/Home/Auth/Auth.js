import React, { useState } from "react";
import Login from "./Login/Login";
import SignUp from "./SignUp/SignUp";

const Auth = (props) => {
  let [signupChosen, setSignupChosen] = useState(false);

  return (
    <div>
      {signupChosen ? (
        <SignUp />
      ) : (
        <>
          <Login />
          <button onClick={() => setSignupChosen(true)}>Signup</button>
        </>
      )}
    </div>
  );
};

export default Auth;
