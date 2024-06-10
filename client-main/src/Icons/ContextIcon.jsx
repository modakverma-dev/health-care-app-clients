import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const SvgComponent = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={19}
    fill="none"
    {...props}>
    <Path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m10.19 1.892 4.883 2.633c.57.307.57 1.185 0 1.492L10.19 8.65a1.452 1.452 0 0 1-1.38 0L3.927 6.017c-.57-.307-.57-1.185 0-1.492L8.81 1.892a1.452 1.452 0 0 1 1.38 0ZM3.208 7.795l4.537 2.272c.562.285.923.863.923 1.493v4.29a.832.832 0 0 1-1.208.742L2.923 14.32A1.679 1.679 0 0 1 2 12.827v-4.29a.832.832 0 0 1 1.208-.742ZM15.792 7.795l-4.537 2.272a1.679 1.679 0 0 0-.923 1.493v4.29a.832.832 0 0 0 1.207.742l4.538-2.272c.563-.285.922-.863.922-1.493v-4.29a.832.832 0 0 0-1.207-.742Z"
    />
  </Svg>
);
export default SvgComponent;
