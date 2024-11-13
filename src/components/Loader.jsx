import { Rings } from "react-loader-spinner";
import React from "react";
const RingsLoader = ({
  visible = true,
  height = 80,
  width = 80,
  color = "#4fa94d",
  ariaLabel = "rings-loading",
}) => {
  return (
    <div className="flex items-center justify-center">
      <Rings
        visible={visible}
        height={height}
        width={width}
        color={color}
        ariaLabel={ariaLabel}
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default RingsLoader;
