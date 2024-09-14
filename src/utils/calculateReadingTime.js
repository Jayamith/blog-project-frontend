import React from "react";

const calculateReadingTime = (text) => {
  const wordCountPerMinute = 200;
  const words = text?.split(/\s/g)?.length;
  const minutes = words / wordCountPerMinute;
  const readTime = Math.ceil(minutes);
  return readTime;
};

export default calculateReadingTime;
