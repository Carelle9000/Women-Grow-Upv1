"use client";
import React from "react";

const BlogCard = ({ image, title, description, className = "" }) => {
  return (
    <article className={`flex flex-col text-black ${className}`}>
      <img
        src={image}
        alt={title}
        className="object-contain w-full  rounded-3xl aspect-[1.35]"
      />
      <h3 className="mt-7 text-xl font-bold">{title}</h3>
      <p className="self-start mt-3">{description}</p>
    </article>
  );
};

export default BlogCard;
