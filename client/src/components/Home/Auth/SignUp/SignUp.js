import React, { useState } from "react";

const SignUp = () => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      console.log("SUBMITTED: ", lastName);

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        }),
      };
      fetch("http://localhost:3000/api/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => this.setState({ postId: data.id }));
    } else {
      alert("Passwords don't match");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
            required
          />
          <input
            type="password"
            name="passwordConfirm"
            placeholder="Confirm password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            autoComplete="off"
            required
          />
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
