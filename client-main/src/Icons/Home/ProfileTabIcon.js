import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke="#221F1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.6}
      strokeWidth={1.5}
      d="M11.985 15.346c-3.868 0-7.17.585-7.17 2.927s3.281 2.948 7.17 2.948c3.867 0 7.17-.586 7.17-2.927s-3.282-2.948-7.17-2.948Z"
      clipRule="evenodd"
    />
    <Path
      stroke="#221F1F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.6}
      strokeWidth={1.429}
      d="M11.985 12.006A4.596 4.596 0 1 0 7.389 7.41a4.58 4.58 0 0 0 4.563 4.596h.033Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgComponent;
