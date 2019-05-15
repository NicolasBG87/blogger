import React from "react";

const Section = ({ section }) => {
  const { heading, content, media } = section;
  const videoId = media.split("v=")[1];

  return (
    <section className="Section">
      <h1 className="Section__heading">{heading}</h1>
      <div className="Section__grid">
        <p className="Section__content">{content}</p>
        {media.includes("https://www.youtube.com") ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
            className="Section__media"
            title="Video"
          />
        ) : (
          <div
            className="Section__media"
            style={{
              backgroundImage: `url(${media})`,
              backgroundPosition: "center center"
            }}
          />
        )}
      </div>
    </section>
  );
};

export default Section;
