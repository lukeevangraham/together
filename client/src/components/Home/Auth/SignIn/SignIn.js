import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn, signOut, getUser } from "../../../../store/actions/auth";
import Button from "../../../UI/Button/Button"

import classes from "./SignIn.module.scss";

const SignIn = ({ emailAfterSignIn, signIn, signOut }) => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // OLD NON-REDUX WAY
    // console.log("Email: ", email);
    // console.log("Pass: ", password);

    // const requestOptions = {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   };
    //   fetch("http://localhost:3000/api/login", requestOptions)
    //     .then((response) => response.json())
    //     // .then((data) => this.setState({ postId: data.id }));
    //     .then((data) => console.log("Data: ", data))

    // REDUX WAY
    signIn({
      email: email,
      password: password,
    });
  };

  return (
    <div className={classes.signIn}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div className={classes.form__group}>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className={classes.form__input}
            required
          />
          <label htmlFor="email" className={classes.form__label}>Email address</label>
        </div>
        <div className={classes.form__group}>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="on"
            className={classes.form__input}
            required
          />
          <label htmlFor="password" className={classes.form__label}>Password</label>
        </div>
        <div className={classes.form__group}>
          <Button type="submit" color={"green"}>
            <>Sign In
            </>
          </Button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  emailAfterSignIn: state.auth.email,
});

export default connect(mapStateToProps, { signIn, signOut, getUser })(SignIn);
