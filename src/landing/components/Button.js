import React from "react";

const Button = ({ styles }) => (
  <button
    type="button"
    style={{ color: "white", backgroundColor: "#62C4C8 !important" }}
    className={`py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
  >
    Join Us Now
  </button>
);

export default Button;
