import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={19}
    fill="none"
    {...props}>
    <Path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M6.51 9.737h1.305v3.038c0 .45.555.66.855.322l3.195-3.63a.488.488 0 0 0-.367-.81h-1.305V5.62c0-.45-.555-.66-.855-.323l-3.195 3.63a.488.488 0 0 0 .367.81Z"
    />
    <Path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      d="M8.978 16.697a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
    />
  </Svg>
);
export default SvgComponent;
