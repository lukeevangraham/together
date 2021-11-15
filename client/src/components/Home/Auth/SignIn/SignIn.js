import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn, signOut, getUser } from "../../../../store/actions/auth";

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          autoComplete="on"
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  emailAfterSignIn: state.auth.email,
});

export default connect(mapStateToProps, { signIn, signOut, getUser })(SignIn);
