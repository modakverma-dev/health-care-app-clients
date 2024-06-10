import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={136}
    height={74}
    fill="none"
    {...props}
  >
    <Path
      stroke="#221F1F"
      strokeWidth={2}
      d="M0 70h15.176L18.5 30l13 40L41 44l10.949 26 17.51-69 13.425 69 14.592-23.324H136"
    />
  </Svg>
);
export default SvgComponent;
