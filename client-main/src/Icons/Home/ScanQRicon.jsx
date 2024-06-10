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
      strokeWidth={2}
      stroke={props.stroke ? props.stroke : "#222"}
      strokeLinecap="round"
      d="M9 4H7c-1.414 0-2.121 0-2.56.44C4 4.878 4 5.585 4 7v2M9 20H7c-1.414 0-2.121 0-2.56-.44C4 19.122 4 18.415 4 17v-2M15 4h2c1.414 0 2.121 0 2.56.44C20 4.878 20 5.585 20 7v2M15 20h2c1.414 0 2.121 0 2.56-.44.44-.439.44-1.146.44-2.56v-2"
    />
  </Svg>
);
export default SvgComponent;
