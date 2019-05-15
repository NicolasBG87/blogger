import React, { useState, useContext } from "react";

import Logo from "assets/logo.png";
import Form from "components/Form/Form";
import Input from "components/Form/Input";

import validator from "validator";
import { APIContext } from "util/API";

const initialFormData = {
  username: "",
  password: "",
  avatar: ""
};

const Register = ({ closeModal }) => {
  const [formData, setFormData] = useState(initialFormData);
  const API = useContext(APIContext);

  /**
   * Set form data value when input field changes
   *
   * @param {Event} e - input field event object
   */
  const onInputChange = e => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /**
   * Register new user on form submit
   *
   * @param {Event} e - form event object
   */
  const onSubmit = e => {
    e.preventDefault();
    API.register(formData).then(() => closeModal());
  };

  return (
    <div className="Register">
      <img src={Logo} alt="Logo" />
      <Form onSubmit={onSubmit}>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 3, max: 20 })}
          error="Must be between 3 and 20 characters long"
          label="Username"
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 6 })}
          error="Must be at least 6 characters long"
          label="Password"
        />
        <Input
          type="text"
          name="avatar"
          value={formData.avatar}
          onChange={onInputChange}
          validator={value => validator.isURL(value)}
          error="Must be a valid URL"
          label="Avatar URL"
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default Register;
