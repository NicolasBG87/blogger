import React from "react";

import Section from "views/Post/Section";

const Content = ({ post }) => {
  const { intro, sections, conclusion } = post;
  return (
    <div className="Post__content">
      <h1 className="Section__heading">Intro</h1>
      <p className="Post__intro">{intro}</p>
      {sections.map((section, index) => (
        <Section section={section} key={index} />
      ))}
      <h1 className="Section__heading">Conclusion</h1>
      <p className="Post__intro">{conclusion}</p>
    </div>
  );
};

export default Content;
