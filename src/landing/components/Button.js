import React from "react";

const Button = ({ styles }) => (
  <div
    type="button"
    style={{ color: "white", backgroundColor: "#62C4C8" }}
    className={`login py-4 px-6 font-poppins font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none ${styles}`}
  >
    <a href="/signup">Join Us Now</a>
  </div>
);

export default Button;
