import React from "react";
import PropTypes from "prop-types";
import * as colors from "../assets/colors";
import Button from "@material-ui/core/Button";
const CustomButton = props => {
  const { type, children, ...rest } = props;
  const COLOR = {
    primary: {
      color: colors["PRIMARY"]
    },
    danger: {
      color: colors["DANGER"]
    }
  };
  const baseBtnStyle = {
    borderRadius: "4px",
    padding: "5px"
  };
  return (
    <Button style={{ ...COLOR[type], ...baseBtnStyle }} {...rest}>
      {children}
    </Button>
  );
};

CustomButton.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node
};
export default CustomButton;
