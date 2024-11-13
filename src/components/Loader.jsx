import { RotatingLines } from "react-loader-spinner";
import React from "react";

const RingsLoader = ({
  visible = true,
  height = 160,
  width = 160,
  color = "#007DF0",
  ariaLabel = "rings-loading",
}) => {
  return (
    <div className="flex items-center justify-center" style={{ color: color }}>
      <RotatingLines
        visible={visible}
        height={height}
        width={width}
        color={color}
        ariaLabel={ariaLabel}
        wrapperStyle={{ color }}
        wrapperClass=""
      />
    </div>
  );
};

export default RingsLoader;
