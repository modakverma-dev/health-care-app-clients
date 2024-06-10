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
      stroke="#fa2f51"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18 6 6 18M6 6l12 12"
    />
  </Svg>
);
export default SvgComponent;
