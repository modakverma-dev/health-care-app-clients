import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
const Search = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}>
    <Path
      stroke="#1D1D1D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.541 19.25a8.708 8.708 0 1 0 0-17.417 8.708 8.708 0 0 0 0 17.417ZM20.166 20.167l-1.833-1.834"
    />
  </Svg>
);
export default Search;
