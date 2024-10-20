import React from "react";

// Import SVG files
import { ReactComponent as EditProfile } from "../../public/Assets/Icons/EditProfile.svg";

const Icon = ({ name, color, size }) => {
  const icons = {
    home: <EditProfile />,
  };

  return (
    <div
      className={`w-${size} h-${size} fill-current text-${color}`}
      style={{ width: size, height: size }}
    >
      {icons[name]}
    </div>
  );
};

export default Icon;
