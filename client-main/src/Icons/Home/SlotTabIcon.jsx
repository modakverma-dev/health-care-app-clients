import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={31}
    fill="none"
    {...props}
  >
    <G
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      clipPath="url(#a)"
    >
      <Path d="M5.813 16.146 16.146 5.812a6.393 6.393 0 1 1 9.041 9.042L14.854 25.188a6.393 6.393 0 1 1-9.041-9.042M10.98 10.98l9.04 9.04" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h31v31H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
