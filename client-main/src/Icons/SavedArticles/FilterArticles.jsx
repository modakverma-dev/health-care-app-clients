import * as React from 'react';
import Svg, { Rect, Path } from 'react-native-svg';
const SvgComponent = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none">
    <Rect
      width={47}
      height={44}
      x={0.5}
      y={0.5}
      fill="#1D1D1D"
      stroke="#1D1D1D"
      opacity={0.04}
      rx={9.5}
    />
    <Path
      stroke="#5474FD"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M34 17.5h-6M18 17.5h-4M22 21a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM34 28.5h-4M20 28.5h-6M26 32a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
    />
  </Svg>
);
export default SvgComponent;
