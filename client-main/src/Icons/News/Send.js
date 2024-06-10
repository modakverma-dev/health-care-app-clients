import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Send = ({ stroke }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} fill="none">
    <Path
      stroke={stroke ? stroke : '#fff'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.783 5.793 14.565 3.2c3.493-1.164 5.39.743 4.236 4.235l-2.595 7.783c-1.741 5.234-4.601 5.234-6.343 0l-.77-2.31-2.31-.77c-5.234-1.742-5.234-4.593 0-6.344ZM9.268 12.512l3.281-3.29"
    />
  </Svg>
);
export default Send;
