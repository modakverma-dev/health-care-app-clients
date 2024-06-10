import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const BackArrow = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={7} height={13} fill="none">
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 1.618 1 6.175l5 4.865"
    />
  </Svg>
);
export default BackArrow;
