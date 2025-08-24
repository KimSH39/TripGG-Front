import * as React from "react";
import type { SVGProps } from "react";
const SvgBus = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="1em"
    height="1em"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <path
      fill="#F5F5F5"
      d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0"
    />
    <path
      stroke="#CCDFF9"
      d="M20 0c11.046 0 20 8.954 20 20s-8.954 20-20 20S0 31.046 0 20 8.954 0 20 0Z"
    />
    <path stroke="#CCDFF9" d="M29 28H11V12h18z" />
    <path stroke="#CCDFF9" d="M29 28H11V12h18z" />
    <path
      fill="#525252"
      d="M20 12c4.2 0 7 1.1 7 2.5V16c.553 0 1 .447 1 1v2c0 .553-.447 1-1 1v5c0 .553-.447 1-1 1v1c0 .553-.447 1-1 1h-1c-.553 0-1-.447-1-1v-1h-6v1c0 .553-.447 1-1 1h-1c-.553 0-1-.447-1-1v-1c-.553 0-1-.447-1-1v-5c-.553 0-1-.447-1-1v-2c0-.553.447-1 1-1v-1.5c0-1.4 2.8-2.5 7-2.5m-5 5v3c0 .553.447 1 1 1h3.5v-5H16c-.553 0-1 .447-1 1m5.5 4H24c.553 0 1-.447 1-1v-3c0-.553-.447-1-1-1h-3.5zm-5 3.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2m9 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2m-1.5-10c0-.275-.225-.5-.5-.5h-5c-.275 0-.5.225-.5.5s.225.5.5.5h5c.275 0 .5-.225.5-.5"
    />
  </svg>
);
export default SvgBus;
