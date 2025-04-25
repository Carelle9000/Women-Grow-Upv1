"use client";
import React from "react";

const AuthorInfo = ({ authorImage, authorName, date }) => {
  return (
    <div className="flex gap-2.5 items-center text-base">
      <img
        src={authorImage}
        alt={`${authorName}'s profile picture`}
        className="object-contain shrink-0 w-10 rounded-full aspect-square"
      />
      <div className="self-stretch my-auto">{authorName}</div>
      <div className="flex gap-1 self-stretch my-auto">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/7e4be891996a4fcfbc2bf1727b9c1c94/b9b6cc6eb91425bcd37d2a66b74f749a4368f81d?placeholderIfAbsent=true"
          alt="Calendar icon"
          className="object-contain shrink-0 w-6 aspect-square"
        />
        <div>{date}</div>
      </div>
    </div>
  );
};

export default AuthorInfo;
