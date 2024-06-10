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
      strokeOpacity={0.6}
      strokeWidth={1.2}
      d="M4.6 3.6h13.8v17.8H4.6zM7 3V2h9v1"
    />
    <Path
      stroke="#221F1F"
      strokeOpacity={0.6}
      d="m6 12.474 1.5-.948 2 2.842L11 9.632l1 4.736 1.5-1.42 1 1.42 1-.947H17"
    />
  </Svg>
);
export default SvgComponent;
