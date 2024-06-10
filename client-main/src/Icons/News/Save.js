import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Save = ({ stroke }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={21} fill="none">
    <Path
      stroke={stroke ? stroke : '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.032 2.552H6.95A3.244 3.244 0 0 0 3.712 5.79v11.815c0 1.51 1.082 2.147 2.407 1.417l4.092-2.272c.436-.244 1.14-.244 1.568 0l4.092 2.272c1.325.738 2.406.1 2.406-1.417V5.789a3.257 3.257 0 0 0-3.245-3.237Z"
    />
  </Svg>
);
export default Save;
