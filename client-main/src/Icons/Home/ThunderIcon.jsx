import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";
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
      stroke={props.stroke}
      d="M11.5 13.8h-1.063c-1.53 0-2.294 0-2.583-.497-.29-.497.088-1.162.844-2.491l2.367-4.167c.375-.66.563-.99.749-.94.186.049.186.428.186 1.187V9.7c0 .236 0 .354.073.427.073.073.191.073.427.073h1.063c1.53 0 2.294 0 2.583.497.29.497-.088 1.162-.844 2.491l-2.367 4.167c-.375.66-.563.99-.749.94C12 18.247 12 17.868 12 17.109V14.3c0-.236 0-.354-.073-.427-.073-.073-.191-.073-.427-.073Z"
    />
    <Circle cx={12} cy={12} r={9} stroke={props.stroke} />
  </Svg>
);
export default SvgComponent;
