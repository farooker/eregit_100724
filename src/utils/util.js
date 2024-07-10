const convertColorNameToRGB = (colorName) => {
  const colors = {
    success: "10, 184, 115",
    warming: "234, 118, 33",
    error: "247, 34, 0",
  };
  return colors[colorName?.toLowerCase()] || "255, 255, 255";
};

export default convertColorNameToRGB;
