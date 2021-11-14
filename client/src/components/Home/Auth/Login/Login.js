import React, { useState } from "react";

const Login = () => {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email: ", email);
    console.log("Pass: ", password);


    const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      };
      fetch("http://localhost:3000/api/login", requestOptions)
        .then((response) => response.json())
        // .then((data) => this.setState({ postId: data.id }));
        .then((data) => console.log("Data: ", data))


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

export default Login;
