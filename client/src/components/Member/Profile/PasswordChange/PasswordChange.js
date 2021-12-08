import React, { useState } from "react";
import Input from "../../../UI/Input/Input";
import Button from "../../../UI/Button/Button";

const PasswordChange = ({ classes }) => {
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
  };

  const passwordChangeFormElementsArray = [];
  for (let key in passwordForm) {
    passwordChangeFormElementsArray.push({
      id: key,
      config: passwordForm[key],
    });
  }

  let renderPasswordChangeForm = (
    <form onSubmit={handlePasswordChangeSubmit} className={`${classes.settings__form} ${classes.settings__form__password}`}>
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

export default PasswordChange;
