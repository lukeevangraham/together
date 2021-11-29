import React, { useState } from "react";
import { connect } from "react-redux";
import { signIn } from "../../../../store/actions/auth"
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

import classes from "./SignUp.module.scss";

const SignUp = ({ signIn }) => {
  const [signUpForm, setSignUpForm] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First Name"
      },
      value: "",
      validation: {
        required: true,
      }
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last Name"
      },
      value: "",
      validation: {
        required: true,
      }
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address"
      },
      value: "",
      validation: {
        required: true,
      }
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password"
      },
      value: "",
      validation: {
        required: true,
      }
    },
    passwordConfirm: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm password"
      },
      value: "",
      validation: {
        required: true,
      }
    },
  })

  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
    if (signUpForm.password.value === signUpForm.passwordConfirm.value) {

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: signUpForm.firstName.value,
          lastName: signUpForm.lastName.value,
          email: signUpForm.email.value,
          password: signUpForm.password.value,
        }),
      };
      console.log("BODY: ", requestOptions.body)
      fetch("http://localhost:3000/api/signup", requestOptions)
        .then((response) => {
          console.log("RES: ", response)
          return response.json()
        })
        .then((data) => {
          console.log("DATA: ", data)
          data.errors ? setError(data.errors[0].message) : (
            signIn({
              email: data.email,
              password: signUpForm.password.value,
            })
          )
        });
    } else {
      setError("Passwords must match");
    }
  };

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedSignUpForm = {
      ...signUpForm,
    }
    const updatedFormElement = {
      ...updatedSignUpForm[inputIdentifier]
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedSignUpForm[inputIdentifier] = updatedFormElement;
    // if (updatedSignUpForm.password.value !== updatedSignUpForm.passwordConfirm.value) {
    //   setError("Passwords must match")
    // } else {
    //   setError("")
    // }
    setSignUpForm(updatedSignUpForm);


    // signUpForm.password.value === signUpForm.passwordConfirm.value ? null : setError("Passwords must match")
  }

  const formElementsArray = [];
  for (let key in signUpForm) {
    formElementsArray.push({
      id: key,
      config: signUpForm[key]
    })
  }

  const form = (
    <form onSubmit={handleSubmit} className={classes.form}>
      {formElementsArray.map((formElement) => (
        <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} changed={e => inputChangedHandler(e, formElement.id)} required={formElement.config.validation.required} />
      ))}
      {error ? <div className={classes.error}>{error}</div> : null}
      <Button type="submit" color={"green"}>
        <>Sign Up
        </>
      </Button>
    </form>
  )

  return (
    <div className={classes.signUp}>
      {/* <form onSubmit={handleSubmit}>
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
      </form> */}
      {form}
    </div>
  );
};

export default connect(null, { signIn })(SignUp);
