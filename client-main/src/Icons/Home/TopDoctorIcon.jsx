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
      <Path d="M7.75 5.167H6.458A2.583 2.583 0 0 0 3.875 7.75v4.52a7.104 7.104 0 1 0 14.208 0V7.75A2.583 2.583 0 0 0 15.5 5.167h-1.292" />
      <Path d="M10.333 19.375a7.75 7.75 0 1 0 15.5 0V15.5M14.208 3.875v2.583M7.75 3.875v2.583M25.833 15.5a2.583 2.583 0 1 0 0-5.167 2.583 2.583 0 0 0 0 5.167Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h31v31H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
