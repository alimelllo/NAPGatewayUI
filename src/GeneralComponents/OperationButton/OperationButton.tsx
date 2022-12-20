import React, { FC, useState } from "react";
import "./style.css";

type IProps = {
  iconName: string;
  title?: string;
  iconColor?: "blue" | "red";
  onClickHandler: () => void;
  disabled?:boolean
};
const OperationButton: FC<IProps> = (props) => {
  const { iconName, title, iconColor, onClickHandler,disabled } = props;
  const [hover, setHover] = useState(false);

  return (
    <button
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`mdi mdi-24px mdi-${iconName} px-1 text-basic button ${
        hover ? `button__hover--${iconColor}` : ""
      }`}
      title={title || ""}
      onClick={onClickHandler}
      disabled={disabled}
    />
  );
};

export default OperationButton;
