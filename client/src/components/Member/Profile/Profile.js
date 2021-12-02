import React, { useState } from "react";
import { connect } from "react-redux"
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import { updateUser } from "../../../store/actions/";

import classes from "./Profile.module.scss";

const Profile = ({ user, updateUser }) => {
  const [profileForm, setProfileForm] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First Name",
      },
      value: user.firstName,
      validation: {
        required: true,
      },
    },
    lastName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Last Name",
      },
      value: user.lastName,
      validation: {
        required: true,
      },
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: user.email,
      validation: {
        required: true,
      },
    },
  });

  const [passwordChangeForm, setPasswordChangeForm] = useState({
    currentPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        required: true,
      },
    },
    newPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "New password",
      },
      value: "",
      validation: {
        required: true,
      },
    },
    newPasswordConfirm: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm new password",
      },
      value: "",
      validation: {
        required: true,
      },
    },
  });

  const profileFormElementsArray = [];
  for (let key in profileForm) {
    profileFormElementsArray.push({
      id: key,
      config: profileForm[key]
    })
  }

  const passwordChangeFormElementsArray = [];
  for (let key in passwordChangeForm) {
    passwordChangeFormElementsArray.push({
      id: key,
      config: passwordChangeForm[key]
    })
  }

  const profileInputChangedHandler = (e, inputIdentifier) => {
    const updatedProfileForm = {
      ...profileForm,
    }
    const updatedFormElement = {
      ...updatedProfileForm[inputIdentifier]
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedProfileForm[inputIdentifier] = updatedFormElement;
    // if (updatedSignUpForm.password.value !== updatedSignUpForm.passwordConfirm.value) {
    //   setError("Passwords must match")
    // } else {
    //   setError("")
    // }
    setProfileForm(updatedProfileForm);


    // signUpForm.password.value === signUpForm.passwordConfirm.value ? null : setError("Passwords must match")
  }

  const [error, setError] = useState("")

  const handleProfileSubmit = (e) => {
      e.preventDefault();
      console.log("FORM: ", e)
      updateUser({
          firstName: profileForm.firstName.value,
          lastName: profileForm.lastName.value,
          email: profileForm.email.value,
          id: user.id
      })
  }

  const renderProfileForm = (
    <form onSubmit={handleProfileSubmit} className={classes.settings__form}>
      {profileFormElementsArray.map((formElement) => (
        <Input key={formElement.id} elementType={formElement.config.elementType} elementConfig={formElement.config.elementConfig} value={formElement.config.value} changed={e => profileInputChangedHandler(e, formElement.id)} required={formElement.config.validation.required} />
      ))}
      {error ? <div className={classes.error}>{error}</div> : null}
      <Button type="submit" color={"green"}>
        <>Update Profile
        </>
      </Button>
    </form>
  )

  return (
    <div className={classes.settings}>
      <h2>Your Profile Settings</h2>
      {renderProfileForm}
    </div>
  );
};

export default connect(null, { updateUser })(Profile);
