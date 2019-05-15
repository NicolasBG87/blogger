import React, { useState, useContext } from "react";

import Logo from "assets/logo.png";
import Form from "components/Form/Form";
import Input from "components/Form/Input";

import validator from "validator";
import { AuthContext } from "util/auth";

const initialFormData = {
  username: "",
  password: ""
};

const Login = ({ closeModal }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { login } = useContext(AuthContext);

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
   * Log the user in on form submit
   *
   * @param {Event} e - form event object
   */
  const onSubmit = e => {
    e.preventDefault();
    login(formData, closeModal);
  };

  return (
    <div className="Login">
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
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default Login;
