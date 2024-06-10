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
      <Path d="M9.042 24.542a2.583 2.583 0 1 0 0-5.167 2.583 2.583 0 0 0 0 5.167ZM21.958 24.542a2.583 2.583 0 1 0 0-5.167 2.583 2.583 0 0 0 0 5.167Z" />
      <Path d="M6.458 21.958H3.875V7.75a1.292 1.292 0 0 1 1.292-1.292h11.625v15.5h-5.167 7.75m5.167 0h2.583v-7.75m0 0H16.792m10.333 0L23.25 7.75h-6.458M10.333 10.333V15.5M7.75 12.917h5.167H7.75Z" />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h31v31H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default SvgComponent;
