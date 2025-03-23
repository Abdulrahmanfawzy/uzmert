import { IconType } from "@/types/utils";
import React from "react";

const SearchIcon: IconType = ({ size, ...otherProps }) => (
  <svg
  width={size || "18"}
  height={size || "18"}
  viewBox="0 0 24 24"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  {...otherProps}
>
  <circle
    cx="11"
    cy="11"
    r="8"
    stroke="currentColor"
    strokeWidth="1.8"
  />
  <line
    x1="16.5"
    y1="16.5"
    x2="21"
    y2="21"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
  />
</svg>

);

export default SearchIcon;
