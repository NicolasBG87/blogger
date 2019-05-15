import React from "react";

import { DATE } from "util/formatter";

const Author = ({ author }) => {
  const { avatar, username, register_date } = author;
  return (
    <div className="Post__author">
      <img src={avatar} alt="Avatar" />
      <div>
        <span>@{username}</span>
        <sub>Member since {DATE.format(register_date)}</sub>
      </div>
    </div>
  );
};

export default Author;
