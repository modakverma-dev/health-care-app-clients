import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    style={props.invert && { transform: [{ rotate: '180deg' }] }}
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
    fill="none"
    {...props}>
    <Path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m13.417 16.03-5.833-5.833 5.833-5.833"
    />
  </Svg>
);
export default SvgComponent;
