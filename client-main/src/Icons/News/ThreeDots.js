import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgComponent = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
    <Path
      stroke="#fff"
      strokeWidth={1.5}
      d="M4.583 9.167A1.839 1.839 0 0 0 2.75 11c0 1.008.825 1.833 1.833 1.833A1.839 1.839 0 0 0 6.417 11a1.839 1.839 0 0 0-1.834-1.833ZM17.416 9.167A1.839 1.839 0 0 0 15.583 11c0 1.008.825 1.833 1.833 1.833A1.839 1.839 0 0 0 19.25 11a1.839 1.839 0 0 0-1.834-1.833ZM11 9.167A1.839 1.839 0 0 0 9.167 11c0 1.008.825 1.833 1.833 1.833A1.839 1.839 0 0 0 12.834 11 1.839 1.839 0 0 0 11 9.167Z"
    />
  </Svg>
);
export default SvgComponent;
