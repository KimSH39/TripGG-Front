import * as React from "react";
import type { SVGProps } from "react";
const SvgQuestion = (props: SVGProps<SVGSVGElement>) => (
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
    <path stroke="#CCDFF9" d="M25 28H15V12h10z" />
    <path stroke="#CCDFF9" d="M25 28H15V12h10z" />
    <path
      fill="#525252"
      d="M17.5 17c0-1.103.897-2 2-2h1c1.103 0 2 .897 2 2v.113c0 .68-.347 1.315-.919 1.68l-1.319.848A2.75 2.75 0 0 0 19 21.953V22a.999.999 0 1 0 2 0v-.044c0-.256.131-.494.344-.631l1.319-.847a4 4 0 0 0 1.837-3.366V17a4 4 0 0 0-4-4h-1a4 4 0 0 0-4 4 .999.999 0 1 0 2 0M20 27a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5"
    />
  </svg>
);
export default SvgQuestion;
