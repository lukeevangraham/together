import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";
import Error from "../../../UI/Error/Error";
import { changePassword } from "../../../../store/actions/";

const PasswordChange = ({
  classes,
  userId,
  changePassword,
  userEmail,
  passChangeError,
}) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Current Password",
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
        placeholder: "New Password",
      },
      value: "",
      validation: {
        required: true,
      },
    },
    confirmPassword: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Confirm Password",
      },
      value: "",
      validation: {
        required: true,
      },
    },
  });

  useEffect(() => {
    passChangeError ? setErrorMessage(passChangeError.message) : setErrorMessage("");
  }, [passChangeError])

  const inputChangedHandler = (e, inputIdentifier) => {
    const updatedForm = {
      ...passwordForm,
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.value = e.target.value;
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    setPasswordForm(updatedForm);
  };

  const handlePasswordChangeSubmit = (e) => {
    e.preventDefault();
    // updateUser({
    //   firstName: profileForm.firstName.value,
    //   lastName: profileForm.lastName.value,
    //   email: profileForm.email.value,
    //   id: userId,
    // });
    console.log("Submit clicked!");
    if (passwordForm.newPassword.value === passwordForm.confirmPassword.value) {
      changePassword({
        email: userEmail,
        password: passwordForm.currentPassword.value,
        userId: userId,
        newPassword: passwordForm.newPassword.value,
      });
      setErrorMessage("")
    } else {
      setErrorMessage("The new passwords don't match");
    }
  };

  const passwordChangeFormElementsArray = [];
  for (let key in passwordForm) {
    passwordChangeFormElementsArray.push({
      id: key,
      config: passwordForm[key],
    });
  }

  let renderPasswordChangeForm = (
    <form
      onSubmit={handlePasswordChangeSubmit}
      className={`${classes.settings__form} ${classes.settings__form__password}`}
    >
      {passwordChangeFormElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={(e) => inputChangedHandler(e, formElement.id)}
          required={formElement.config.validation.required}
        />
      ))}
      {errorMessage ? <Error message={errorMessage} /> : null}
      <Button type="submit" color={"green"}>
        Save Password
      </Button>
    </form>
  );

  return (
    <>
      <h2>Password Change</h2>
      {renderPasswordChangeForm}
    </>
  );
};

const mapStateToProps = (state) => ({
  passChangeError: state.auth.passChangeError,
});

export default connect(mapStateToProps, { changePassword })(PasswordChange);
