import React from "react";

const Button = ({ label, onClick }) => {
  return <button className='save-button' onClick={onClick}>{label}</button>;
};

export default Button;
