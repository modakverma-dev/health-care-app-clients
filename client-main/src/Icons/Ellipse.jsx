import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={64}
    height={49}
    fill="none"
    {...props}>
    <Circle cx={58} cy={21} r={6} fill="#1D1D1D" />
    <Circle cx={4} cy={4} r={4} fill="#FFD880" />
    <Circle cx={46} cy={47} r={2} fill="#FF6B7B" />
  </Svg>
);
export default SvgComponent;
