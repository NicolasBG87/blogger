import React, { useState, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Logo from "assets/logo.png";
import Form from "components/Form/Form";
import Input from "components/Form/Input";
import Select from "components/Form/Select";
import Textarea from "components/Form/Textarea";
import MaterialIcon from "material-icons-react";

import { CATEGORIES } from "util/constants";
import validator from "validator";
import { APIContext } from "util/API";
import { AuthContext } from "util/auth";

const initialSections = [
  {
    heading: "",
    content: "",
    media: ""
  }
];

const CreatePost = ({ closeModal }) => {
  const { create_post } = useContext(APIContext);
  const { user } = useContext(AuthContext);
  const [sections, setSections] = useState(initialSections);
  const initialFormData = {
    title: "",
    tagline: "",
    featured_image: "",
    intro: "",
    conclusion: "",
    author: user.username,
    category: CATEGORIES[0],
    sections: []
  };
  const [formData, setFormData] = useState(initialFormData);

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
   * Set section data depending on the current section
   * when input field changes
   *
   * @param {Event} e - input field event object
   * @param {Number} section - index of the section to be modified
   */
  const onDynamicInputChange = (e, section) => {
    const { value, name } = e.target;
    const updatedSections = [...sections];
    updatedSections[section][name] = value;
    setSections(updatedSections);
  };

  /**
   * Add an empty section form field
   */
  const addSection = () => {
    const emptySection = {
      heading: "",
      content: "",
      media: ""
    };
    setSections(prevState => [...prevState, emptySection]);
  };

  /**
   * Create new post on form submit
   *
   * @param {Event} e - form event object
   */
  const onSubmit = e => {
    e.preventDefault();
    const updatedFormData = { ...formData };
    updatedFormData.sections = sections;
    create_post(updatedFormData).then(() => {
      closeModal();
    });
  };

  return (
    <div className="CreatePost">
      <img src={Logo} alt="Logo" />
      <Form onSubmit={onSubmit}>
        <h1 className="CreatePost__heading">Basic Info:</h1>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 2, max: 40 })}
          error="Must be between 2 and 40 characters long"
          label="Title"
        />
        <Input
          type="text"
          name="tagline"
          value={formData.tagline}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 6 })}
          error="Must be at least 6 characters long"
          label="Tagline"
        />
        <Input
          type="text"
          name="featured_image"
          value={formData.featured_image}
          onChange={onInputChange}
          validator={value => validator.isURL(value)}
          error="Must be a valid URL"
          label="Featured Image URL"
        />
        <Textarea
          type="text"
          name="intro"
          value={formData.intro}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 6 })}
          error="Must be at least 6 characters long"
          label="Introduction"
        />
        <Select
          name="category"
          value={formData.category}
          onChange={onInputChange}
          options={CATEGORIES}
          label="Category"
        />
        <TransitionGroup>
          {sections.map((section, index) => {
            const { heading, content, media } = section;
            return (
              <CSSTransition
                key={index}
                timeout={300}
                classNames={"CreatePost__section"}
              >
                <>
                  <hr />
                  <h1 className="CreatePost__heading">Section {index + 1}:</h1>
                  <Input
                    type="text"
                    name="heading"
                    value={heading}
                    onChange={e => onDynamicInputChange(e, index)}
                    validator={value =>
                      validator.isLength(value, { min: 1, max: 20 })
                    }
                    error="Tagline must be between 1 and 20 characters long"
                    label="Section Heading"
                  />
                  <Textarea
                    type="text"
                    name="content"
                    value={content}
                    onChange={e => onDynamicInputChange(e, index)}
                    validator={value => validator.isLength(value, { min: 100 })}
                    error="Must be at least 100 characters long"
                    label="Textual Content"
                  />
                  <Input
                    type="text"
                    name="media"
                    value={media}
                    onChange={e => onDynamicInputChange(e, index)}
                    validator={value => validator.isURL(value)}
                    error="Must be a valid URL"
                    label="Image/Youtube Video URL"
                  />
                </>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
        <MaterialIcon
          onClick={addSection}
          icon="add_circle"
          color="#4bb462"
          size={50}
        />
        <Textarea
          type="text"
          name="conclusion"
          value={formData.conclusion}
          onChange={onInputChange}
          validator={value => validator.isLength(value, { min: 6 })}
          error="Must be at least 6 characters long"
          label="Conclusion"
        />
        <button type="submit">Submit</button>
      </Form>
    </div>
  );
};

export default CreatePost;
