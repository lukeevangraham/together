import React, { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";

const Auth = (props) => {
  let [signupChosen, setSignupChosen] = useState(false);

  return (
    <div>
      {signupChosen ? (
        <SignUp />
      ) : (
        <>
          <SignIn />
          <button onClick={() => setSignupChosen(true)}>Signup</button>
        </>
      )}
    </div>
  );
};

export default Auth;
