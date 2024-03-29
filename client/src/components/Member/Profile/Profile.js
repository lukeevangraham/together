import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../UI/Input/Input";
import Button from "../../UI/Button/Button";
import PasswordChange from "./PasswordChange/PasswordChange";
import Image from "./Image/Image";
import { updateUser } from "../../../store/actions/";

import classes from "./Profile.module.scss";

const Profile = ({
  userId,
  userEmail,
  userFirstName,
  userLastName,
  updateUser,
  formError,
  user,
}) => {
  const [profileForm, setProfileForm] = useState({
    firstName: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "First Name",
      },
      value: "",
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
      value: "",
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
      value: userEmail,
      validation: {
        required: true,
      },
    },
  });

  // IF A USER LOGS IN AND GOES DIRECTLY TO THE PROFILE PAGE, WE NEED THIS FORM WITH USESTATE TO RE-RENDER
  // THE USE EFFECT WILL CALL setProfileForm TO UPDATE THE FORM
  // the form listens to the useState, not props

  useEffect(() => {
    if (userFirstName && userLastName) {
      const newProfileForm = { ...profileForm };

      const newFirstName = {
        ...newProfileForm.firstName,
      };
      newFirstName.value = userFirstName;
      newProfileForm.firstName = newFirstName;

      const newLastName = {
        ...newProfileForm.lastName,
      };
      newLastName.value = userLastName;
      newProfileForm.lastName = newLastName;

      // const newEmail = {
      //   ...newProfileForm.email,
      // };
      // newEmail.value = user.email;
      // newProfileForm.email = newEmail

      setProfileForm(newProfileForm);
    }

    if (formError) {
      formError.forEach((error) => {
        const updatedProfileForm = { ...profileForm };
        const newFormElement = {
          ...updatedProfileForm[error.path],
        };
        newFormElement.value = user[error.path];
        updatedProfileForm[error.path] = newFormElement;
        setProfileForm(updatedProfileForm);
      });
    }
  }, [userFirstName, userLastName, formError, user, profileForm]);

  const profileFormElementsArray = [];
  for (let key in profileForm) {
    profileFormElementsArray.push({
      id: key,
      config: profileForm[key],
    });
  }

  const profileInputChangedHandler = (e, inputIdentifier) => {
    const updatedProfileForm = {
      ...profileForm,
    };
    const updatedFormElement = {
      ...updatedProfileForm[inputIdentifier],
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedProfileForm[inputIdentifier] = updatedFormElement;

    setProfileForm(updatedProfileForm);
  };

  const [error, setError] = useState("");

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updateUser({
      firstName: profileForm.firstName.value,
      lastName: profileForm.lastName.value,
      email: profileForm.email.value,
      id: userId,
    });
  };

  let renderProfileForm = (
    <form onSubmit={handleProfileSubmit} className={classes.settings__form}>
      {profileFormElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(e) => profileInputChangedHandler(e, formElement.id)}
          required={formElement.config.validation.required}
        />
      ))}
      {error ? <div className={classes.error}>{error}</div> : null}
      {formError ? (
        <div className={classes.error}>{formError[0].message}</div>
      ) : null}
      <Button type="submit" color={"green"}>
        <>Update Profile</>
      </Button>
    </form>
  );

  return (
    <div className={classes.settings}>
      <h2>Your Profile Settings</h2>
      {renderProfileForm}
      <PasswordChange
        classes={classes}
        userId={user.id}
        userEmail={user.email}
      />
      <Image
        userId={user.id}
        existingImage={user.image}
        classes={classes}
        user={user}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  userEmail: state.auth.email,
  userId: state.auth.id,
  userFirstName: state.auth.firstName,
  userLastName: state.auth.lastName,
  formError: state.auth.error,
  user: state.auth,
});

export default connect(mapStateToProps, { updateUser })(Profile);
