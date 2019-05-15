import React, { useState, useContext } from "react";
import validator from "validator";

import Form from "components/Form/Form";
import Input from "components/Form/Input";
import Textarea from "components/Form/Textarea";

import { APIContext } from "util/API";

const initialFormData = {
  username: "",
  content: ""
};

const CommentForm = ({ post, setPost }) => {
  const [formData, setFormData] = useState(initialFormData);
  const { comment_post } = useContext(APIContext);

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
   * Create new post on form submit
   *
   * @param {Event} e - form event object
   */
  const onSubmit = (e, _id) => {
    e.preventDefault();
    comment_post({ _id, data: formData }).then(response => {
      setPost(response.data.data);
      resetForm();
    });
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return (
    <div className="Post__comment-form">
      <Form onSubmit={e => onSubmit(e, post._id)}>
        <Input
          type="text"
          name="username"
          value={formData.username}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 2, max: 20 })}
          error="Must be between 3 and 20 characters long"
          label="Your Name"
        />
        <Textarea
          type="text"
          name="content"
          value={formData.content}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 2 })}
          error="Must be at least 2 characters long"
          label="Comment"
        />
        <button type="submit">Post Comment</button>
      </Form>
    </div>
  );
};

export default CommentForm;
