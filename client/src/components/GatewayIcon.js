import { SvgIcon } from "@mui/material";
import React from "react";

const GatewayIcon = (props) => {
  return (
    <SvgIcon {...props} viewBox="-50 -50 100 100">
      <path
        d="
M -45 10
C -45 0 -45 0 -35 0
L 35 0
C 45 0 45 0 45 10
L 45 30
C 45 40 45 40 35 40
L -35 40
C -45 40 -45 40 -45 30
L -45 10"
        fill="#000"
        stroke="#000"
        strokeWidth="1"
      />
      <circle cx="0" cy="20" r="8" stroke="#00f" strokeWidth="1" fill="#00f" />
      <circle
        cx="-25"
        cy="20"
        r="8"
        stroke="#f00"
        strokeWidth="1"
        fill="#f00"
      />
      <circle cx="25" cy="20" r="8" stroke="#0f0" strokeWidth="1" fill="#0f0" />
      <line
        x1="-20"
        y1="1"
        x2="-45"
        y2="-45"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="0"
        y1="1"
        x2="0"
        y2="-45"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="1"
        x2="45"
        y2="-45"
        stroke="#000"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </SvgIcon>
  );
};

export default GatewayIcon;
