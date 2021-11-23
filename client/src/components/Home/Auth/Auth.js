import React, { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import Button from "../../UI/Button/Button"

import classes from "./Auth.module.scss"

const Auth = (props) => {
  let [signupChosen, setSignupChosen] = useState(false);

  return (
    <div className={classes.Auth}>
      {signupChosen ? (
        <SignUp />
      ) : (
        <>
          <SignIn />
          <div className={classes.signUpWrapper}>
            {/* <hr style={{ marginBottom: "3rem", }} /> */}

            <Button color="secondary" clicked={() => setSignupChosen(true)}>Create An Account</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Auth;
